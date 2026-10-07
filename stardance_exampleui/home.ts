import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxDecoration, BoxFit, Breadcrumb, BreadcrumbSeparator, Button, ButtonType, Card, Center, Colors, Column, Container, CrossAxis, DatePicker, DoAction, EdgeInsets, Empty, FontWeight, FormSubmitAction, Frame, Iconify, Image, InputOTP, InputOTPChild, InputType, LaunchURL, MainAxis, MemoryImage, NavigationBar, NavigationBarAlignment, NavigationItem, NavigationLabelType, NavType, NeneDisplay, NeneNavbottom, NeneNavItem, NetworkImage, Padding, PromptMode, Row, Scaffold, SelectFile, setVar, SingleChildScrollView, SizedBox, Text, TextAlign, TextEditingController, TextField, TextStyle, Var, VideoPlugin } from "../lib/widgets";

export const path = "/ui/main"
export async function run(req: Request, res: Response, pass: any) {
  let _scf = Scaffold('#mainScaffold', {
    appBar: AppBar('#appBar', {
      leading: Iconify('star', { color: Colors.white }),
      title: Text("#txt", { text: "Stardance", style: TextStyle({ color: Colors.white }) })
    }),

    body: NeneDisplay({
      urlMap: {
        0: "/ui/route_a",
        1: "/ui/route_b"
      }
    }),

    bottom: NeneNavbottom({
      type: NavType.normal,
      items: [
        NeneNavItem({
          icon: Iconify("home", {
            color: "#641aad"
          }),
          index: 0,
          title: "Home"
        }),
        NeneNavItem({
          icon: Iconify("profile", {}),
          index: 1,
          title: "Profile"
        }),
        NeneNavItem({
          icon: Iconify("favorite", {}),
          index: 2,
          title: "Favorite"
        }),
        NeneNavItem({
          icon: Iconify("settings-account-box", {}),
          index: 3,
          title: "Settings"
        })
      ]
    })
  });

  res.json(_scf);
}