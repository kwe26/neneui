import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxFit, Button, ButtonType, Center, Column, CrossAxis, DoAction, Empty, FormSubmitAction, Iconify, Image, InputType, MainAxis, NetworkImage, Scaffold, setVar, SingleChildScrollView, SizedBox, Text, TextEditingController, TextField, TextStyle, Var } from "../lib/widgets";
import { ForEach } from "../lib/core/ForEach";

export const path = "/ui/main"
export function run(req: Request, res: Response, pass: any) {
    let scaffold = Scaffold('#mainScaffold', {
        appBar: AppBar('#appBar', {
            leading: Iconify("home", {}),
            title: Text('#appBarText', { text: "NeneUI Example" })
        }),
        preActions: [
            DoAction(Action.SHOW_TOAST, "NYA-NYA"),
            DoAction(Action.DEBUG, "dai"),
            DoAction(Action.SET_VAR, setVar(
                {
                    variable: 'testMap', 
                    value: [
                        {title: "Nene Yashiro"},
                        {title: "Hanako"}
                    ]
                }
            ))
        ],
        body: SingleChildScrollView('#sch', {
            child: Column(
                '#mainColumn',
                {
                    mainAxisAlignment: MainAxis.center,
                    crossAxisAlignment: CrossAxis.center,
                    children: [
                        Center(Text("#textAb", { text: `Welcome to NeneUI`, style: TextStyle({}) })),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        Avatar('#avatarNene', {
                            backgroundColor: '#7711a0F',
                            badge: AvatarBadge({
                                size: 12,
                                child: Empty(),
                                color: "#09ff00"
                            }),
                            size: 64,
                            image: NetworkImage("https://i1.sndcdn.com/artworks-yKHnrEHNk6dPazfk-cvc2yA-t500x500.jpg")
                        }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        Image('#imageTest', {
                            path: NetworkImage("https://pbs.twimg.com/profile_images/1371906433172844546/YD9zBd3G.jpg"),
                            width: 200,
                            fit: BoxFit.contain,
                            height: 200
                        }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        SizedBox("#loginSizedBox", {
                            width: 200,
                            height: 200,
                            child: Column("#colLogin", {
                                mainAxisAlignment: MainAxis.start,
                                crossAxisAlignment: CrossAxis.start,
                                children: [
                                    TextField("#userName", {
                                        controller: TextEditingController({}),
                                        inputType: InputType.text,
                                        placeholder: Text('#placeText', { text: "Username" })
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    TextField("#userPassword", {
                                        controller: TextEditingController({}),
                                        inputType: InputType.password,
                                        placeholder: Text('#placeText', { text: "Password" })
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Button('#submitButton', {
                                        type: ButtonType.Success,
                                        child: Text('#submitButtonText', { text: "Submit" }),
                                        onPressed: DoAction(Action.SUBMIT, FormSubmitAction({
                                            variables: ["#userPassword.controller", "#userName.controller"],
                                            varNames: ["password", "username"],
                                            callbackPath: "/ui/test_callback"
                                        }))
                                    })
                                ]
                            })
                        }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        // Column('#forEachTest', {
                        //     mainAxisAlignment: MainAxis.start,
                        //     crossAxisAlignment: CrossAxis.start,
                        //     children: [ForEach('#forEachW', {
                        //         varToForEach: "testMap",
                        //         namespaceVar: "testMap",
                        //         child: Text('#TextABC', {
                        //             text: Var({
                        //                 template: "Hello, %1",
                        //                 variable: "for.title"
                        //             })
                        //         })
                        //     })]
                        // })
                    ]
                }
            )
        })
    });

    res.json(scaffold);
}