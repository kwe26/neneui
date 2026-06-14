import type { Request, Response } from "express";
import { Action, AlertDialog, Button, ButtonType, Callback, DoAction, Iconify, InputType, NewProps, Text, TextEditingController, TextField } from "../lib/widgets";

export const path = "/ui/test_callback"

export function run(req: Request, res: Response, pass: any) {
    console.log(req.body);

    let callbac = Callback({
        callbacks: [
            DoAction(Action.SHOW_TOAST, `The Server Saw What You wrote ${req.body.username} and ${req.body.password}`),
            DoAction(Action.DIALOG, AlertDialog(
                {
                    title: Text("#diagTitle", { text: "Dialog #1" }),
                    leading: Iconify("home", {}),
                    content: Text('#di', { text: "Dialog Contet" }),
                    actions: [
                        Button('#btnCancel', {
                            type: ButtonType.Danger,
                            child: Text('#txt', { text: "Close" }),
                            onPressed: DoAction(Action.NAVIGATE_POP, "")
                        })
                    ]
                }
            )),
            DoAction(Action.PROPS, NewProps({
                id: "#userPassword",
                props: TextField('#userPassword', {
                    controller: TextEditingController({}),
                    inputType: InputType.password,
                    placeholder: Text('#placeText', { text: "Password ohlooll" })
                })
            }))
        ]
    });

    res.json(callbac);
}