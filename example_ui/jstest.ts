import type { Request, Response } from "express";
import { Action, AppBar, Avatar, ButtonDensity, CodeSnippet, EdgeInsets, Padding, CheckBox, Compare, ButtonGroup, BoxConstraints, AvatarBadge, BoxFit, Button, ButtonShape, ButtonType, Center, Column, CrossAxis, DoAction, Empty, FormSubmitAction, Iconify, Image, InputType, MainAxis, NetworkImage, Row, Scaffold, setVar, SingleChildScrollView, SizedBox, Text, TextEditingController, TextField, TextStyle, Var } from "../lib/widgets";
import { readFileSync } from "node:fs"

export const path = "/ui/jstest"
export async function run(req: Request, res: Response, pass: any) {
    let scaffold = Scaffold('#mainScaffold', {
        preActions:[
            DoAction(Action.SHOW_TOAST, "HELLO WOLRD")
        ],
        body: SingleChildScrollView('#singleChild', {
        child: Padding("#paddingMain", {
            padding: EdgeInsets.all(12),
            child: Column("#columnA", {
                mainAxisAlignment: MainAxis.center,
                crossAxisAlignment: CrossAxis.center,
                children: [
                    Center(Text("#textAb", { text: `Math.random() (SSR) -> ${Math.random()}`, style: TextStyle({}) })),
                ]
            })
        })
    })
    })

    res.json(scaffold);
}