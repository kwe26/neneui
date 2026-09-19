import type { Request, Response } from "express";
import { AppBar, Colors, Column, CrossAxis,FontWeight, Iconify, MainAxis, SingleChildScrollView, Scaffold, Text, TextStyle, TextAlign } from "@neneys/ui";

export const path = "/ui/main"
export function run(req: Request, res: Response, pass: any) {
    let scaffold = Scaffold('#mainScaffold', {
        appBar: AppBar('#appBar', {
            leading: Iconify("home", { color: Colors.white }),
            title: Text('#appBarText', { text: "NeneUI Example", style: TextStyle({
                color: Colors.white
            }) })
        }),
        preActions: [],
        body: SingleChildScrollView('#sch', {
            child: Column(
                '#mainColumn',
                {
                    mainAxisAlignment: MainAxis.center,
                    crossAxisAlignment: CrossAxis.center,
                    children: [
                        Text('#textNene', {
                            text: "Welcome to NeneUI!",
                            align: TextAlign.center,
                            style: TextStyle(
                                {
                                    fontWeight: FontWeight.w600,
                                    fontSize: 32
                                }
                            )
                        }),
                        Text("#neneText2", {text: "You can start modifying example_ui/home.ts to add or remove more Widgets and Customize it with your needs!!!"})
                    ]
                }
            )
        })
    });

    res.json(scaffold);
}