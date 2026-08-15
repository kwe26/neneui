import type { Request, Response } from "express";
import { Action, AlertDialog, Button, ButtonType, Callback, DoAction, Iconify, InputType, NewProps, setVar, Text, TextEditingController, TextField } from "../lib/widgets";

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
            })),
            DoAction(Action.SET_VAR, setVar(
                {
                    variable: 'testMap',
                    value: [
                        { title: "Nene Yashiro", gender: "Female", image: "https://i.pinimg.com/564x/e5/b5/0c/e5b50ca05ef01d460659cf88622d3190.jpg" },
                        { title: "Hanako Amane", gender: "Male", image: "https://i1.sndcdn.com/artworks-yKHnrEHNk6dPazfk-cvc2yA-t500x500.jpg" }
                    ]
                }
            ))
        ]
    });

    res.json(callbac);
}