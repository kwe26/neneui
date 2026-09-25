import express from "express"
import * as fs from "node:fs";
import { join } from "path";
import { Action, DoAction } from "../widgets";
import path from "node:path";
import multer from "multer";
import { Theme, type ThemeProps } from "./theme";
import { JavaScriptEngine, type JavascriptEngine } from "./javascript";

export interface NeneServerProps {
    port: number,
    uiPath: string,
    verbose?: boolean,
    pass?: any,
    payments?: any,
    jsEngine?: JavascriptEngine,
    themeLight?: ThemeProps,
    themeDark?: ThemeProps,
    captureErrors?: boolean,
    callbackPath: string
}

export async function NeneServer({
    port = 3500,
    uiPath = "interfaces",
    verbose = true,
    pass = {},
    themeLight = Theme({}),
    themeDark = Theme({}),
    payments = null,
    captureErrors = false,
    jsEngine = JavaScriptEngine({ enabled: true }),
    callbackPath = "callbacks"
} : NeneServerProps){
    const app = express();

    const uploadDir = path.join(process.cwd(), "uploads");

    const logsDir = path.join(process.cwd(), "logs");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    if(captureErrors){
        if (!fs.existsSync(logsDir)) {
            fs.mkdirSync(logsDir, { recursive: true });
        }
    }

    pass = {
        ...pass,
        port: port,
    }

    const storage = multer.diskStorage({
        destination(req, file, cb) {
            cb(null, uploadDir);
        },

        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const name =
                Date.now() +
                "-" +
                Math.random().toString(36).slice(2) +
                ext;

            cb(null, name);
        },
    });

    const upload = multer({
        storage,
    });

    app.get("/__neneui__", async (req, res) => {
        res.json({
            "name": "__neneui__",
            "version": ((await import("../../package.json")).version),
            "captureErrors": captureErrors,
            "jsEngine": jsEngine,
            "appTheme": {
                "light": themeLight,
                "dark": themeDark
            }
        });
    });

    // Register Interfaces from Path
    let uiPathDir = join(process.cwd(), uiPath);
    let callbackPathDir = join(process.cwd(), callbackPath);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    readDir(uiPathDir);

    app.post("/__neneui__/report", async (req, res) => {
        const {
            path,
            report
        } = req.body;

      
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
        ${path}

        EXCEPTION
        ----------------------------------------------------------------
        ${report}

        # ================================================================
        # END OF REPORT
        # ================================================================
        `;

        fs.writeFileSync(
        join(logsDir, `${timestamp.toISOString().replace(/[:.]/g, '-')}.txt`),
        log.trim()
        );
        res.json({
            status: true,message: "Report Submitted!"
        })
    });

    async function readDir(dir: string){
        let files = fs.readdirSync(dir);

        for(var file of files){
            if(file.endsWith(".ts")){
                // Register by Importing
                let importFile = (await import(join(uiPathDir, file)))
                if(verbose) console.log(`[#NENE] : UI : ${importFile.path}`)
                app.get(importFile.path, (req, res) => importFile.run(req, res, pass));
            }else{
                let dir_fd = fs.statSync(join(uiPathDir, file));
                if(dir_fd.isDirectory()) readDir(join(uiPathDir, file));
            }
        }
    }

    if(payments !== null) app.use(payments);

    await readDirForCallbacks(callbackPathDir);

    async function readDirForCallbacks(dir: string){
        let files = fs.readdirSync(dir);

        for(var file of files){
            if(file.endsWith(".ts")){
                // Register by Importing
                let importFile = (await import(join(callbackPathDir, file)))
                if(verbose) console.log(`[#NENE] : Callback : ${importFile.path}`)
                app.post(importFile.path,upload.any() ,(req, res) => importFile.run(req, res, pass));
            }else{
                let dir_fd = fs.statSync(join(callbackPathDir, file));
                if(dir_fd.isDirectory()) readDir(join(callbackPathDir, file));
            }
        }
    }

    await app.listen(port, () => {
        if(verbose) console.log(`[#NENE] : Listening at *:${port}`)
    })
}

export interface CallbackProps {
    callbacks: {action: Action, data: any}[]
}

export function Callback({
    callbacks = []
} : CallbackProps) {
    return {
        callbacks
    };
}