import express from "express"
import * as fs from "node:fs";
import { join } from "path";
import { Action, DoAction } from "../widgets";
import path from "node:path";
import multer from "multer";

export interface NeneServerProps {
    port: number,
    uiPath: string,
    verbose?: boolean,
    pass?: any,
    callbackPath: string
}

export async function NeneServer({
    port = 3500,
    uiPath = "interfaces",
    verbose = true,
    pass = {},
    callbackPath = "callbacks"
} : NeneServerProps){
    const app = express();

    const uploadDir = path.join(process.cwd(), "uploads");

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
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

    // Register Interfaces from Path
    let uiPathDir = join(process.cwd(), uiPath);
    let callbackPathDir = join(process.cwd(), callbackPath);

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    readDir(uiPathDir);

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