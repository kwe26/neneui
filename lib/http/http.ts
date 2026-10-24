import express, { type Request } from "express";
import * as fs from "node:fs";
import { join } from "node:path";
import path from "node:path";
import type { IncomingMessage } from "node:http";
import multer from "multer";
import cors from "cors";
import { WebSocketServer, type WebSocket } from "ws";

import { Action } from "../widgets";
import { Theme, type ThemeProps } from "./theme";
import { JavaScriptEngine, type JavascriptEngine } from "./javascript";
import { exec, execSync, spawn } from "node:child_process";
import { stderr } from "node:process";

export enum ReqType {
  GET = "get",
  POST = "post",
}

export interface WsRouteProps {
  path: string;
  run: (
    socket: WebSocket,
    req: IncomingMessage,
    pass: any,
    params: Record<string, string>,
  ) => void;
}

export interface WssOptions {
  /** Base path for WebSocket routes. Default: "/ws" */
  path?: string;

  /** Called for every new WebSocket connection. */
  onConnection?: (socket: WebSocket, req: IncomingMessage, pass: any) => void;
}

export interface NeneServerProps {
  port: number;
  uiPath: string;
  verbose?: boolean;
  reqType?: ReqType;
  pass?: any;
  payments?: any;
  phpPath?: string;
  flutterWebPath?: string;
  jsEngine?: JavascriptEngine;
  themeLight?: ThemeProps;
  themeDark?: ThemeProps;
  captureErrors?: boolean;
  wss?: boolean | WssOptions;
  callbackPath: string;
  cb?: any;
}

export async function NeneServer({
  port = 3500,
  uiPath = "interfaces",
  verbose = true,
  pass = {},
  themeLight = Theme({}),
  themeDark = Theme({}),
  flutterWebPath = "none",
  reqType = ReqType.GET,
  phpPath = "disabled",
  payments = null,
  wss = false,
  captureErrors = false,
  jsEngine = JavaScriptEngine({ enabled: true }),
  callbackPath = "callbacks",
  cb,
}: NeneServerProps) {
  const app = express();

  app.use(
    cors({
      origin: "*",
    }),
  );

  function isNeneUIRequest(req: Request): boolean {
    return (
      req.get("user-agent") === "NeneUI/1.0" ||
      req.get("x-neneui-client") === "NeneUI/1.0"
    );
  }

  function isCrawlerRequest(req: Request): boolean {
    const userAgent = req.get("user-agent") ?? "";

    return /Googlebot|Bingbot|Slurp|DuckDuckBot|Baiduspider|YandexBot|facebookexternalhit|Twitterbot|LinkedInBot|Discordbot|WhatsApp/i.test(
      userAgent,
    );
  }

  if (flutterWebPath !== "none") app.use(express.static(flutterWebPath));

  const uploadDir = path.join(process.cwd(), "uploads");
  const logsDir = path.join(process.cwd(), "logs");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  if (captureErrors) {
    fs.mkdirSync(logsDir, { recursive: true });
  }

  if (phpPath !== "disabled") {
    const output = (await execSync(`"${phpPath}" -v`)).toString();
    const match = output.match(/PHP\s+(\d+)\.(\d+)\.(\d+)/);

    if (!match) throw new Error("Unable to detect PHP version");

    const [, major, minor, patch] = match.map(Number);

    const minimumVersions: Record<string, number> = {
      "8.5": 12,
      "8.4": 27,
      "8.3": 36,
    };

    const minimumPatch = minimumVersions[`${major}.${minor}`];

    if (minimumPatch !== undefined && patch! < minimumPatch) {
      console.error(
        `PHP ${major}.${minor}.${patch} is unsupported due to security reasons (PHP Shell Vulnerbernity). Minimum required: ${major}.${minor}.${minimumPatch}`,
      );
      process.exit(-1);
    }

    const server = spawn(
      phpPath,
      ["-S", `0.0.0.0:${port + 1}`, "-t", path.join(__dirname, "webphp")],
      { stdio: ["ignore", "pipe", "pipe"] },
    );

    server.stdout.on("data", (data) => console.log("[PHP]", data.toString()));
    server.stderr.on("data", (data) => console.log("[PHP]", data.toString()));

    server.on("error", (error) =>
      console.error("[PHP] Failed to start:", error),
    );
    server.on("close", (code) =>
      console.log("[PHP] Server exited with code:", code),
    );
  }

  pass = {
    ...pass,
    reqType,
    port,
  };

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },

    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      const name = Date.now() + "-" + Math.random().toString(36).slice(2) + ext;

      cb(null, name);
    },
  });

  const upload = multer({ storage });

  function attachFiles(pass: any, req: Request): void {
    const files: Express.Multer.File[] = Array.isArray(req.files)
      ? req.files
      : req.file
        ? [req.file]
        : [];

    if (files.length === 0) return;

    const map: Record<string, string> = {};

    for (const file of files) {
      const rel = path
        .relative(process.cwd(), file.path)
        .split(path.sep)
        .join("/");

      map[file.fieldname] = rel;
    }

    pass.files = map;
  }

  app.get("/__neneui__", async (req, res) => {
    res.json({
      name: "__neneui__",
      version: (await import("../../package.json")).version,
      captureErrors,
      jsEngine,
      appTheme: {
        light: themeLight,
        dark: themeDark,
      },
    });
  });

  const uiPathDir = join(process.cwd(), uiPath);
  const callbackPathDir = join(process.cwd(), callbackPath);

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Register HTTP interfaces.
  async function readDir(dir: string): Promise<void> {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await readDir(fullPath);
        continue;
      }

      if (!file.endsWith(".ts")) continue;

      const importFile = await import(fullPath);

      if (
        typeof importFile.path !== "string" ||
        typeof importFile.run !== "function"
      ) {
        if (verbose) {
          console.warn(`[#NENE] : UI : Skipping invalid interface ${file}`);
        }
        continue;
      }

      if (verbose) {
        console.log(`[#NENE] : UI : ${importFile.path}`);
      }

      app.all(importFile.path, async (req, res, next) => {
        if (isNeneUIRequest(req)) {
          if (verbose) {
            console.log(`[#NENE] : UI : ${importFile.path} accessed`);
          }

          return importFile.run(req, res, pass);
        }

        if (isCrawlerRequest(req) && phpPath !== "disabled") {
          const url = new URL(`http://localhost:${port + 1}/http.php`);

          url.searchParams.set("path", req.path);
          url.searchParams.set("port", String(port));

          return res.redirect(307, url.toString());
        }

        if (req.accepts("html") && flutterWebPath) {
          return res.sendFile(path.resolve(flutterWebPath, "index.html"));
        }
      });

      if (reqType === ReqType.GET) {
        app.all(importFile.path, async (req, res, next) => {
          if (isNeneUIRequest(req)) {
            if (verbose) {
              console.log(`[#NENE] : UI : ${importFile.path} accessed`);
            }

            return importFile.run(req, res, pass);
          }

          if (isCrawlerRequest(req) && phpPath !== "disabled") {
            const url = new URL(`http://localhost:${port + 1}/http.php`);

            url.searchParams.set("path", req.path);
            url.searchParams.set("port", String(port));

            return res.redirect(307, url.toString());
          }

          if (req.accepts("html") && flutterWebPath) {
            return res.sendFile(path.resolve(flutterWebPath, "index.html"));
          }

          return next();
        });
      } else {
        app.post(importFile.path, (req, res) => {
          if (verbose) {
            console.log(`[#NENE] : UI : ${importFile.path} accessed`);
          }

          pass.shared_pref_body = req.body?.shared_pref_body;
          return importFile.run(req, res, pass);
        });
      }
    }
  }

  // Register HTTP callbacks.
  async function readDirForCallbacks(dir: string): Promise<void> {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
      const fullPath = join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        await readDirForCallbacks(fullPath);
        continue;
      }

      if (!file.endsWith(".ts")) continue;

      const importFile = await import(fullPath);

      if (
        typeof importFile.path !== "string" ||
        typeof importFile.run !== "function"
      ) {
        if (verbose) {
          console.warn(`[#NENE] : Callback : Skipping invalid file ${file}`);
        }
        continue;
      }

      if (verbose) {
        console.log(`[#NENE] : Callback : ${importFile.path}`);
      }

      app.post(importFile.path, upload.any(), (req, res) => {
        pass.files = {};
        attachFiles(pass, req);
        importFile.run(req, res, pass);
      });
    }
  }

  // Error reporting.
  app.post("/__neneui__/report", (req, res) => {
    if (!captureErrors) {
      res.status(404).json({
        status: false,
        message: "Error reporting is disabled.",
      });
      return;
    }

    const { path: reportPath, report } = req.body ?? {};
    const timestamp = new Date();

    const log = `
# ================================================================
# NENE UI RUNTIME ERROR REPORT
# ================================================================

TIMESTAMP
----------------------------------------------------------------
${timestamp.toISOString()}

PATH
----------------------------------------------------------------
${reportPath ?? "Unknown"}

EXCEPTION
----------------------------------------------------------------
${report ?? "No report supplied"}

# ================================================================
# END OF REPORT
# ================================================================
`;

    fs.writeFileSync(
      join(logsDir, `${timestamp.toISOString().replace(/[:.]/g, "-")}.txt`),
      log.trim(),
    );

    res.json({
      status: true,
      message: "Report Submitted!",
    });
  });

  // Register payment middleware.
  if (payments !== null) {
    app.use(payments);
  }

  // Load all HTTP routes before listening.
  await readDir(uiPathDir);
  await readDirForCallbacks(callbackPathDir);

  // Start the HTTP server.
  const server = app.listen(port);

  await new Promise<void>((resolve, reject) => {
    server.once("listening", resolve);
    //server.once("listening", cb);
    server.once("error", reject);
  });

  if (typeof cb === "function") await cb();

  if (verbose) {
    const address = server.address();
    const actualPort =
      address && typeof address !== "string" ? address.port : port;

    console.log(`[#NENE] : Listening at *:${actualPort}`);
  }

  // Optional WebSocket routing.
  if (wss) {
    const opts: WssOptions = typeof wss === "object" ? wss : {};

    const wsPath = (opts.path ?? "/ws").replace(/\/+$/, "") || "/";

    const wsDirectory = join(process.cwd(), "ws");

    const wsRoutes: WsRouteProps[] = [];

    // Load WebSocket routes recursively.
    async function readDirForWs(dir: string): Promise<void> {
      if (!fs.existsSync(dir)) return;

      const files = fs.readdirSync(dir);

      for (const file of files) {
        const fullPath = join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          await readDirForWs(fullPath);
          continue;
        }

        if (!file.endsWith(".ts")) continue;

        const module = await import(fullPath);

        if (
          typeof module.path !== "string" ||
          typeof module.run !== "function"
        ) {
          if (verbose) {
            console.warn(`[#NENE] : WS : Skipping invalid route ${file}`);
          }
          continue;
        }

        const routePath = module.path.startsWith("/")
          ? module.path
          : `/${module.path}`;

        wsRoutes.push({
          path: routePath,
          run: module.run,
        });

        if (verbose) {
          console.log(`[#NENE] : WS : ${wsPath}${routePath} (${file})`);
        }
      }
    }

    function matchWsRoute(
      routePath: string,
      pathname: string,
    ): Record<string, string> | null {
      const routeParts = routePath.split("/").filter(Boolean);
      const pathParts = pathname.split("/").filter(Boolean);

      if (routeParts.length !== pathParts.length) {
        return null;
      }

      const params: Record<string, string> = {};

      for (let i = 0; i < routeParts.length; i++) {
        const routePart: any = routeParts[i];
        const pathPart = pathParts[i];

        if (routePart.startsWith(":")) {
          try {
            params[routePart.slice(1)] = decodeURIComponent(
              pathPart!.toString(),
            );
          } catch {
            return null;
          }
        } else if (routePart !== pathPart) {
          return null;
        }
      }

      return params;
    }

    await readDirForWs(wsDirectory);

    // Prefer routes with more static segments.
    wsRoutes.sort((a, b) => {
      const score = (route: string) =>
        route
          .split("/")
          .filter(Boolean)
          .reduce((total, part) => total + (part.startsWith(":") ? 0 : 1), 0);

      return score(b.path) - score(a.path);
    });

    const wsServer = new WebSocketServer({
      noServer: true,
    });

    server.on("upgrade", (req, socket, head) => {
      let pathname: string;

      try {
        pathname = new URL(
          req.url ?? "/",
          `http://${req.headers.host ?? "localhost"}`,
        ).pathname;
      } catch {
        socket.destroy();
        return;
      }

      // Only handle requests inside the configured prefix.
      if (pathname !== wsPath && !pathname.startsWith(`${wsPath}/`)) {
        socket.destroy();
        return;
      }

      const relativePath = pathname.slice(wsPath.length) || "/";

      let matchedRoute: WsRouteProps | undefined;
      let matchedParams: Record<string, string> | null = null;

      for (const route of wsRoutes) {
        const params = matchWsRoute(route.path, relativePath);

        if (params !== null) {
          matchedRoute = route;
          matchedParams = params;
          break;
        }
      }

      if (!matchedRoute || matchedParams === null) {
        socket.write(
          "HTTP/1.1 404 Not Found\r\n" + "Connection: close\r\n\r\n",
        );
        socket.destroy();
        return;
      }

      wsServer.handleUpgrade(req, socket, head, (ws) => {
        wsServer.emit("connection", ws, req, matchedRoute, matchedParams);
      });
    });

    wsServer.on(
      "connection",
      (
        ws: WebSocket,
        req: IncomingMessage,
        route: WsRouteProps,
        params: Record<string, string>,
      ) => {
        if (verbose) {
          console.log(`[#NENE] : WS : connected ${req.url}`);
        }

        let alive = true;

        ws.on("pong", () => {
          alive = true;
        });

        const heartbeat = setInterval(() => {
          if (ws.readyState !== ws.OPEN) {
            clearInterval(heartbeat);
            return;
          }

          if (!alive) {
            ws.terminate();
            clearInterval(heartbeat);
            return;
          }

          alive = false;
          ws.ping();
        }, 30_000);

        ws.on("close", () => {
          clearInterval(heartbeat);
        });

        try {
          opts.onConnection?.(ws, req, pass);
          route.run(ws, req, pass, params);
        } catch (error) {
          if (verbose) {
            console.error("[#NENE] : WS : Route error", error);
          }

          ws.close(1011, "Route initialization failed");
        }
      },
    );

    server.on("close", () => {
      wsServer.close();
    });

    if (verbose) {
      console.log(`[#NENE] : WS : Routes enabled at ${wsPath}/*`);
    }
  }

  return {
    app,
    server,
  };
}

export function GetPrefs(pass: any, name: string): string | undefined {
  if (pass.reqType === ReqType.GET) {
    throw new Error("ReqType must be POST in order to use GetPrefs");
  }

  let decode: Record<string, unknown>;

  try {
    decode = JSON.parse(atob(pass.shared_pref_body));
  } catch {
    decode = {};
  }

  if (!Object.prototype.hasOwnProperty.call(decode, name)) {
    return undefined;
  }

  return decode[name] as string;
}

export function SendWidget(socket: WebSocket, widget: any) {
  socket.send(
    JSON.stringify({
      event: "widget_recv",
      data: widget,
    }),
  );
}

export function SendAction(socket: WebSocket, action: any) {
  socket.send(
    JSON.stringify({
      event: "action_recv",
      data: action,
    }),
  );
}

export function GetFile(pass: any, name: string): string | undefined {
  const files = pass?.files;

  if (!files || typeof files !== "object") {
    return undefined;
  }

  if (!Object.prototype.hasOwnProperty.call(files, name)) {
    return undefined;
  }

  const rel = files[name];

  if (typeof rel !== "string" || rel.length === 0) {
    return undefined;
  }

  return rel;
}

export interface CallbackProps {
  callbacks: {
    action: Action;
    data: any;
  }[];
}

export function Callback({ callbacks = [] }: CallbackProps) {
  return {
    callbacks,
  };
}
