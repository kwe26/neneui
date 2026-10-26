import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxDecoration, BoxFit, Breadcrumb, BreadcrumbSeparator, Button, ButtonType, Card, Center, Colors, Column, Container, CrossAxis, DatePicker, DoAction, EdgeInsets, Empty, FontWeight, FormSubmitAction, Frame, Iconify, Image, InputOTP, InputOTPChild, InputType, LaunchURL, MainAxis, MemoryImage, NavigationBar, NavigationBarAlignment, NavigationItem, NavigationLabelType, NavType, NeneNavbottom, NeneNavItem, NetworkImage, Padding, PromptMode, Row, Scaffold, SelectFile, setVar, SingleChildScrollView, SizedBox, Text, TextAlign, TextEditingController, TextField, TextStyle, Var, VideoPlugin } from "../lib/widgets";

export const path = "/ui/route_a"
export async function run(req: Request, res: Response, pass: any) {
    let stardanceApiProjects = await fetch('https://stardance.hackclub.com/api/v1/projects', {
        headers: {
            Authorization: 'Bearer '+process.env['STARDANCE_KEY']
        }
    });

    let projects = await stardanceApiProjects.body?.json();

    var projectWidgets = [];

    for (var proj of projects.projects) {
        projectWidgets.push(
            Padding('#padingCard' + proj['id'], {
                padding: EdgeInsets.all(2),
                child: SizedBox('#szBox' + proj['id'],
                    {
                        width: 1000,
                        height: 200,
                        child: Card('#projCard' + proj['id'], {
                            color: Colors.white,
                            child: Padding('#paddingCard' + proj['id'], {
                                padding: EdgeInsets.all(9),
                                child: Column(
                                    'coluCard' + proj['id'],
                                    {
                                        mainAxisAlignment: MainAxis.start,
                                        crossAxisAlignment: CrossAxis.start,
                                        children: [
                                            Container('#containerImage', {
                                                child: Image("#image" + proj['id'], {
                                                    path: NetworkImage(proj.banner_url ?? 'https://stardance.hackclub.com/assets/landing/header/stardance-logo-df399a7f.png'),
                                                    width: 1000,
                                                    fit: BoxFit.contain,
                                                    height: 60
                                                }),
                                                decoration: BoxDecoration({
                                                    radius: 5,
                                                    borderColor: "#0000"
                                                })
                                            }),
                                            Text("#textId" + proj['id'], {
                                                text: proj['title'],
                                                align: TextAlign.left,
                                                style: TextStyle({
                                                    fontSize: 21,
                                                })
                                            }),
                                            proj['description'] !== null ? Text("#textId" + proj['id'], {
                                                text: proj['description'] !== null ? proj['description'] : "",
                                                align: TextAlign.left,
                                                style: TextStyle({
                                                    fontSize: 12,
                                                    fontWeight: FontWeight.w500
                                                })
                                            }) : Empty(),
                                            Text("#textCId" + proj['id'], {
                                                text: "Created On: " + proj.created_at,
                                                align: TextAlign.left,
                                                style: TextStyle({
                                                    fontSize: 8
                                                })
                                            }),
                                            Text("#textCId" + proj['id'], {
                                                text: "Total Devlogs: " + proj.devlog_ids.length,
                                                align: TextAlign.left,
                                                style: TextStyle({
                                                    fontSize: 9
                                                })
                                            }),
                                        ]
                                    }
                                )
                            })
                        })
                    })
            })
        );
    }

    let _scf = SingleChildScrollView('#schView', {
        child: Padding('#padding', {
            padding: EdgeInsets.all(8),
            child: Column('#columnMain', {
                mainAxisAlignment: MainAxis.center,
                crossAxisAlignment: CrossAxis.center,
                children: projectWidgets
            })
        })
    });

    res.json(_scf);
}