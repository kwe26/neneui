import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxDecoration, BoxFit, Breadcrumb, BreadcrumbSeparator, Button, ButtonType, Card, Center, Colors, Column, Container, CrossAxis, DatePicker, DoAction, EdgeInsets, Empty, FontWeight, FormSubmitAction, Frame, Iconify, Image, InputOTP, InputOTPChild, InputType, LaunchURL, MainAxis, MemoryImage, NavigationBar, NavigationBarAlignment, NavigationItem, NavigationLabelType, NavType, NeneNavbottom, NeneNavItem, NetworkImage, Padding, PromptMode, Row, Scaffold, SelectFile, setVar, SingleChildScrollView, SizedBox, Text, TextAlign, TextEditingController, TextField, TextStyle, Var, VideoPlugin } from "../lib/widgets";

export const path = "/ui/route_b"
export async function run(req: Request, res: Response, pass: any) {

    let _scf = SingleChildScrollView('#schView', {
        child: Padding('#padding', {
            padding: EdgeInsets.all(8),
            child: Column('#columnMain', {
                mainAxisAlignment: MainAxis.center,
                crossAxisAlignment: CrossAxis.center,
                children: [
                    Text("#txtId", {
                        text: "Profile"
                    })
                ]
            })
        })
    });

    res.json(_scf);
}