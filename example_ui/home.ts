import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxFit, Breadcrumb, BreadcrumbSeparator, Button, ButtonType, Center, Column, CrossAxis, DatePicker, DoAction, Empty, FormSubmitAction, Frame, Iconify, Image, InputOTP, InputOTPChild, InputType, LaunchURL, MainAxis, MemoryImage, NetworkImage, PromptMode, Row, Scaffold, SelectFile, setVar, SingleChildScrollView, SizedBox, Text, TextEditingController, TextField, TextStyle, Var } from "../lib/widgets";
import { ForEach } from "../lib/core/ForEach";
import { DateTime } from "../lib/core/DateTime";

export const path = "/ui/main"
export function run(req: Request, res: Response, pass: any) {
    let scaffold = Scaffold('#mainScaffold', {
        appBar: AppBar('#appBar', {
            leading: Iconify("home", {}),
            title: Text('#appBarText', { text: "NeneUI Example" })
        }),
        preActions: [
            DoAction(Action.SHOW_TOAST, "NYA-NYA"),
           // DoAction(Action.DEBUG, "dai"),
            DoAction(Action.SET_VAR, setVar(
                {
                    variable: 'testMap',
                    value: [
                        { title: "Nene Yashiro", gender: "Male", image: "https://i.pinimg.com/564x/e5/b5/0c/e5b50ca05ef01d460659cf88622d3190.jpg" },
                        { title: "Hanako", gender: "Female", image: "https://i1.sndcdn.com/artworks-yKHnrEHNk6dPazfk-cvc2yA-t500x500.jpg" }
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
                        Breadcrumb('#bc', {
                            separator: BreadcrumbSeparator.arrowSeparator,
                            children: [
                                Text('#t', { text: "Home" }),
                                Text('#t', { text: "Nene" })
                            ]
                        }),
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
                        Column("#colLogin", {
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
                                    DatePicker('#dtp', {
                                        mode: PromptMode.dialog,
                                        defaultDate: DateTime.now()
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    InputOTP('#ipOpt', {
                                        onSubmitted: DoAction(Action.SHOW_TOAST, "Hello World"),
                                        children: [
                                            InputOTPChild.character({allowDigit: true}),
                                            InputOTPChild.character({allowDigit: true}),
                                            InputOTPChild.character({allowDigit: true}),
                                            InputOTPChild.character({allowDigit: true}),
                                        ]
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Button('#debug', {
                                        type: ButtonType.Warning,
                                        child: Text("#debug", {text: "DEBUG"}),
                                        onPressed: DoAction(Action.DEBUG, "")
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Button('#linkTest', {
                                        type: ButtonType.Secondary,
                                        child: Text("#debug", {text: "Open Link"}),
                                        onPressed: DoAction(Action.LAUNCH_URL, LaunchURL({
                                            url: "https://google.com",
                                            noLaunch: DoAction(Action.SHOW_TOAST, "Hello, i cannot")
                                        }))
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Image('#imageTest', {
                                        path: MemoryImage('selFile'),
                                        width: 50,
                                        fit: BoxFit.contain,
                                        height: 50
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Text("#slFileInfo", {
                                        text: Var({
                                            template: "%1",
                                            variable: "selFile.name"
                                        })
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Button('#selectFile', {
                                        type: ButtonType.Warning,
                                        child: Text("#selectFileText", {text: "Select File"}),
                                        onPressed: DoAction(Action.SELECT_FILE, SelectFile({
                                            types: "jpg,png,gif,iso,zip",
                                            title: "WOWOWOW",
                                            variable: "selFile"
                                        }))
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Button('#submitButton', {
                                        type: ButtonType.Success,
                                        child: Text('#submitButtonText', { text: "Submit" }),
                                        onPressed: DoAction(Action.SUBMIT, FormSubmitAction({
                                            variables: ["#userPassword.controller", "#userName.controller", "#dtp.controller"],
                                            varNames: ["password", "username", "date"],
                                            fileVariable: ["selFile"],
                                            fileNames: ["file"],
                                            callbackPath: "/ui/test_callback"
                                        }))
                                    }),
                                    SizedBox("#sz", { width: 10, height: 10 }),
                                    Button('#submitButtonK', {
                                        type: ButtonType.Info,
                                        child: Text('#submitButtonTextK', { text: "JS Test" }),
                                        onPressed: DoAction(Action.JAVASCRIPT, `console.log("Var: "+getVariable("#userName.controller")); action('${Action.SHOW_TOAST}', Date.now() + ' Hello World ' + getVariable("#userName.controller"));`)
                                    })
                                ]
                            }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        // Frame("#frame", {
                        //     framePath: "/ui/frameTest"
                        // }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        // Column('#forEachTest', {
                        //     mainAxisAlignment: MainAxis.start,
                        //     crossAxisAlignment: CrossAxis.start,
                        //     foreach: true,
                        //     children: ForEach('#forEachW', {
                        //         varToForEach: "testMap",
                        //         namespaceVar: "testMap",
                        //         child: Row('#roWCh', {
                        //             children: [
                        //                 Text('#TextABC', {
                        //                     text: Var({
                        //                         template: "Hello, %1 (%2)",
                        //                         variable: "for.title,for.gender"
                        //                     })
                        //                 })
                        //             ]
                        //         })
                        //     })
                        // })
                    ]
                }
            )
        })
    });

    res.json(scaffold);
}