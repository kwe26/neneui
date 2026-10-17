import type { Request, Response } from "express";
import { Action, AppBar, Avatar, ButtonDensity, CodeSnippet, EdgeInsets, Padding, CheckBox, Compare, ButtonGroup, BoxConstraints, AvatarBadge, BoxFit, Button, ButtonShape, ButtonType, Center, Column, CrossAxis, DoAction, Empty, FormSubmitAction, Iconify, Image, InputType, MainAxis, NetworkImage, Row, Scaffold, setVar, SingleChildScrollView, SizedBox, Text, TextEditingController, TextField, TextStyle, Var, WebSocket } from "../lib/widgets";
import { readFileSync } from "node:fs"

export const path = "/ui/jstest"
export async function run(req: Request, res: Response, pass: any) {
    let scaffold = Scaffold('#mainScaffold', {
        preActions:[
            DoAction(Action.SHOW_TOAST, "HELLO WOLRD")
        ],
        body: WebSocket({
            url: "ws://localhost:3500/ws/home",
        }),
        bottom: SizedBox(
            '#szBox',
            {
                height: 50,
                child: Row('#szRow', {
                    mainAxisAlignment: MainAxis.center,
                    crossAxisAlignment: CrossAxis.center,
                    children: [
                        SizedBox('#szTxtf', {
                            width: 1000,
                            height: 50,
                            child: TextField('#txtField', {
                                controller: TextEditingController({}),
                                placeholder: Text('#placTxt', {text: "Message"})
                            })
                        }),
                        Button('#txtButton', {
                            child: Iconify("send", {}),
                            type: ButtonType.Normal,
                            shape: ButtonShape.circle,
                            onPressed: DoAction(Action.MULTI_ACTION, [
                                DoAction(Action.SEND_SOCKET, FormSubmitAction({
                                    callbackPath: ":socket:",
                                    variables: ["#txtField.controller"],
                                    varNames: ["txt"]
                                })),
                                DoAction(Action.SHOW_TOAST, "Woo, it works ;!>"),
                                DoAction(Action.CLEAR, "#txtField.controller")
                            ])
                        })
                    ]
                })
            }
        )
    })

    res.json(scaffold);
}