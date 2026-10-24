import { exec } from "node:child_process";
import {
  NeneServer,
  ReqType,
  Theme,
  type ThemeProps,
  type WssOptions,
} from "../widgets";

const getPort = async (appId: string) => {
  const net = await import("node:net"),
    crypto = await import("node:crypto"),
    base =
      10000 +
      (crypto
        .createHash("sha256")
        .update(appId + Math.floor(Date.now() / 3600000))
        .digest()
        .readUInt32BE(0) %
        50000);
  for (let i = 0; i < 50000; i++) {
    const port = 10000 + ((base - 10000 + i) % 50000);
    const free = await new Promise<boolean>((r) => {
      const s = net
        .createServer()
        .once("error", () => r(false))
        .once("listening", () => s.close(() => r(true)))
        .listen(port, "127.0.0.1");
    });
    if (free) return port;
  }
  throw new Error("No free ports");
};

export interface NeneDesktopProps {
  runtimeDir?: string;
  interfaces: string;
  callbacks: string;
  appId: string;
  pass?: any;
  appIcon: string;
  appTitle: string;
  debug?: boolean;
  themeLight?: ThemeProps;
  themeDark?: ThemeProps;
  wss?: boolean | WssOptions;
}

export async function NeneDesktop({
  runtimeDir = "auto",
  interfaces,
  callbacks,
  appId = "com.neneui.desktop",
  appIcon = "./assets/ndr_icon.ico",
  appTitle = "NeneUI Desktop",
  themeDark = Theme({}),
  themeLight = Theme({}),
  debug = false,
  wss = false,
}: NeneDesktopProps) {
  // Convert appId to Unique Ports
  const port = await getPort(appId);

  var autoRuntimeDir;

  // Fetch Runtime
  if (runtimeDir == "auto") {
    if (process.platform === "win32") {
      const fs = await import("node:fs");
      const { execFileSync } = await import("node:child_process");

      const candidates: string[] = [process.env.NDRTIME ?? ""];

      for (const hive of ["HKCU", "HKLM"]) {
        try {
          const output = execFileSync(
            "reg",
            ["query", hive, "/f", "WINNDRTIME", "/s"],
            { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] },
          );

          const match = output.match(
            /^\s*WINNDRTIME\s+REG_(?:EXPAND_)?SZ\s+(.+?)\s*$/im,
          );

          if (match) candidates.push(match[1]!);
        } catch {}
      }

      candidates.push(
        "C:\\Program Files\\NeneDesktopRuntime\\nene_desktop_runtime.exe",
      );

      const runtime = candidates.find(
        (p) => p && fs.existsSync(p) && fs.statSync(p).isFile(),
      );

      if (runtime) {
        autoRuntimeDir = runtime;
      } else {
        console.warn("Nene Desktop Runtime not found.");
      }
    }
  }

  NeneServer({
    port: port,
    callbackPath: callbacks,
    uiPath: interfaces,
    reqType: ReqType.POST,
    themeDark: themeDark,
    verbose: false,
    themeLight: themeLight,
    wss: wss,
    cb: (data: any) => {
      if (runtimeDir == "auto") {
        exec(
          `${autoRuntimeDir!} --appuri=http://localhost:${port} --app-title "${appTitle}" --app-icon "${appIcon}" --app-id "${appId}" ${debug ? "--appdebug" : ""}`,
          {}
        );
      } else {
        exec(
          `${runtimeDir!} --appuri=http://localhost:${port} --app-title "${appTitle}" --app-icon "${appIcon}" --app-id "${appId}" ${debug ? "--appdebug" : ""}`,
        );
      }
    },
  });
}
