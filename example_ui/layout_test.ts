import { type Request, type Response } from "express";
import { Layouts, Layout, Scaffold, Text } from "../lib/widgets";

export const path = "/ui/layout-test"
export async function run(req: Request, res: Response, pass: any) {
    let scaffold = Scaffold('#mainScaffold', {
        body: Layouts('#layouts', {
            fixed: true,
            layouts: [
                Layout('#lyt1', {
                    widget: Text('#txtWidget', {
                        text: "Hello World"
                    }),
                    width: 350
                }),
                Layout('#lyt2', {
                    widget: Text('#txtWidget2', {
                        text: "Hello World 2nd Time"
                    })
                })
            ]
        })
    });

    res.json(scaffold);
}