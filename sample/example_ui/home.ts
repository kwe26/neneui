import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxFit, Breadcrumb, BreadcrumbSeparator, Button, ButtonType, Center, Colors, Column, CrossAxis, DatePicker, DoAction, Empty, FontWeight, FormSubmitAction, Frame, Iconify, Image, InputOTP, InputOTPChild, InputType, LaunchURL, MainAxis, MemoryImage, NetworkImage, PromptMode, Row, Scaffold, SelectFile, setVar, SingleChildScrollView, SizedBox, Text, TextAlign, TextEditingController, TextField, TextStyle, Var } from "@neneys/ui";

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