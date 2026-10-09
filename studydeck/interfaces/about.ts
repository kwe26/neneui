import type { Request, Response } from "express";
import {
  Action, AppBar, Button, ButtonType, Card, Colors, Column, CrossAxis, DoAction, EdgeInsets,
  FontWeight, Iconify, Padding, Scaffold, SingleChildScrollView, SizedBox, Text, TextStyle,
} from "@neneys/ui";

export const path = "/ui/about";

export function run(_req: Request, res: Response, pass: any) {
  res.json(
    Scaffold("#aboutScaffold", {
      appBar: AppBar("#aboutBar", {
        leading: Iconify("info", {}),
        title: Text("#aboutTitle", { text: "About", style: TextStyle({}) }),
      }),
      body: SingleChildScrollView("#aboutScroll", {
        child: Padding("#aboutPad", {
          padding: EdgeInsets.all(16),
          child: Column("#aboutCol", {
            crossAxisAlignment: CrossAxis.stretch,
            children: [
              Card("#aboutCard", {
                type: "filled",
                padding: EdgeInsets.all(16),
                child: Column("#aboutCardCol", {
                  crossAxisAlignment: CrossAxis.start,
                  children: [
                    Text("#aboutH", { text: "StudyDeck", style: TextStyle({ fontSize: 24, fontWeight: FontWeight.w700 }) }),
                    SizedBox("#aboutG1", { height: 8 }),
                    Text("#aboutP", {
                      text: "Every screen on this app is described by a TypeScript server and rendered natively by Flutter via NeneUI — no WebView.",
                    }),
                    SizedBox("#aboutG2", { height: 8 }),
                    Text("#aboutPort", { text: `Server port: ${pass.port}` }),
                  ],
                }),
              }),
              SizedBox("#aboutG3", { height: 16 }),
              Button("#backBtn", {
                type: ButtonType.Primary,
                child: Text("#backText", { text: "Back" }),
                onPressed: DoAction(Action.NAVIGATE_POP, ""),
              }),
            ],
          }),
        }),
      }),
    }),
  );
}
