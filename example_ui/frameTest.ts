import type { Request, Response } from "express";
import { Action, AppBar, Avatar, ButtonDensity, CodeSnippet, EdgeInsets, Padding, CheckBox, Compare, ButtonGroup, BoxConstraints, AvatarBadge, BoxFit, Button, ButtonShape, ButtonType, Center, Column, CrossAxis, DoAction, Empty, FormSubmitAction, Iconify, Image, InputType, MainAxis, NetworkImage, Row, Scaffold, setVar, SingleChildScrollView, SizedBox, Text, TextEditingController, TextField, TextStyle, Var } from "../lib/widgets";
import { readFileSync } from "node:fs"

export const path = "/ui/frameTest"
export async function run(req: Request, res: Response, pass: any) {
    let scaffold = SingleChildScrollView('#singleChild', {
        child: Padding("#paddingMain", {
            padding: EdgeInsets.all(12),
            child: Column("#columnA", {
                mainAxisAlignment: MainAxis.center,
                crossAxisAlignment: CrossAxis.center,
                children: [
                    Center(Text("#textAb", { text: `Math.random() -> ${Math.random()}`, style: TextStyle({}) })),
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
                    Image('#imageTest', {
                        path: NetworkImage("https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"),
                        width: 200,
                        fit: BoxFit.contain,
                        height: 200
                    }),
                    SizedBox("#sz2", { width: 10, height: 10 }),
                    Iconify('home', {}),
                    SizedBox("#sz2", { width: 10, height: 10 }),
                    TextField('#textF10', {
                        controller: TextEditingController({ value: "Hey there nene, How are you?" }),
                        inputType: InputType.text
                    }),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    CheckBox('#checkBoxState', {
                        trailing: Text("#textI", {
                            text: "Is Yashiro a Daikon?",
                        }),
                        value: false
                    }),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    Center(Text("#textAb", {
                        text: Var({
                            template: "%1, Is Yashiro a Daikon? %2",
                            variable: "#textF10.controller,#checkBoxState.controller"
                        }), style: TextStyle({
                            fontSize: 20,
                        })
                    })),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    Compare({
                        fi: "#checkBoxState.controller",
                        ifEqualTo: "true",
                        then: Text("#OhYeah", { text: "Oh she is , you are right" }),
                        or: Text("#NoWay", { text: "Noo, you are wrong!!!" }),
                    }),
                    SizedBox("#sz2", { width: 10, height: 10 }),
                    Button("#buttonAA", {
                        child: Text("#textButton", {
                            text: "Button Click",
                            style: TextStyle({})
                        }),
                        leading: Empty(),
                        type: ButtonType.Danger,
                        density: ButtonDensity.comfortable,
                        shape: ButtonShape.rectangle,
                        disabled: false,
                        onPressed: DoAction(Action.SHOW_TOAST, "Hello World")
                    }),
                    SizedBox("#sz2", { width: 10, height: 10 }),
                    Row('#rowA', {
                        mainAxisAlignment: MainAxis.center,
                        crossAxisAlignment: CrossAxis.center,
                        children: [
                            ButtonGroup('#bGroup', {
                                children: [
                                    Button("#buttonHideAppBar", {
                                        child: Text("#textButton", {
                                            text: "Hide AppBar",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Danger,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.HIDE, "#appBarApp")
                                    }),

                                    Button("#buttonShowAppBar", {
                                        child: Text("#textButton", {
                                            text: "Show AppBar",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Secondary,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.SHOW, "#appBarApp")
                                    }),

                                    Button("#buttonDaikonDebug", {
                                        child: Text("#textButton", {
                                            text: "DaikonDebug",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Success,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.DEBUG, "1234")
                                    }),

                                    Button("#buttonVar", {
                                        child: Text("#textButton", {
                                            text: "SetVar",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Success,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.SET_VAR, setVar({
                                            variable: 'default',
                                            value: "Nene is not"
                                        }))
                                    }),

                                    Button("#buttonVar", {
                                        child: Text("#textButton", {
                                            text: "Page Test",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Warning,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.NAVIGATE, "/ui/nav_test")
                                    }),
                                ]
                            })
                        ]
                    }),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    CodeSnippet('#codeSnippet', {
                        code: await readFileSync("./index.ts", { encoding: 'utf8' }).toString(),
                        lang: "js",
                        constraints: BoxConstraints({
                            maxHeight: 700,
                            minWidth: 800,
                            minHeight: 200,
                            maxWidth: 800
                        }),
                        actions: []
                    })
                ]
            })
        })
    })

    res.json(scaffold);
}