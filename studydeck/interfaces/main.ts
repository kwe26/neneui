import type { Request, Response } from "express";
import {
  Action, AppBar, Button, ButtonDensity, ButtonType, Card, Colors, Column, CrossAxis, Divider,
  DoAction, EdgeInsets, FontWeight, FormSubmitAction, Iconify, InputType, MainAxis, Padding,
  Row, Scaffold, SingleChildScrollView, SizedBox, Text, TextAlign, TextEditingController,
  TextField, TextStyle,
} from "@neneys/ui";
import { tasks, toggleTask, removeTask } from "../store";

// The initial route MUST be /ui/main
export const path = "/ui/main";

function taskCard(t: (typeof tasks)[number]) {
  return Card(`#card${t.id}`, {
    type: "outlined",
    padding: EdgeInsets.all(12),
    child: Column(`#cardCol${t.id}`, {
      crossAxisAlignment: CrossAxis.start,
      children: [
        Text(`#subj${t.id}`, {
          text: t.subject.toUpperCase(),
          style: TextStyle({ fontSize: 11, fontWeight: FontWeight.w700 }),
        }),
        Text(`#title${t.id}`, {
          text: t.title,
          style: TextStyle({ fontSize: 16, fontWeight: FontWeight.w600 }),
        }),
        SizedBox(`#gap${t.id}`, { height: 8 }),
        Row(`#actions${t.id}`, {
          children: [
            Button(`#toggle${t.id}`, {
              type: t.done ? ButtonType.Secondary : ButtonType.Success,
              density: ButtonDensity.dense,
              leading: Iconify(t.done ? "undo" : "check", { size: 18 }),
              child: Text(`#toggleText${t.id}`, { text: t.done ? "Undo" : "Done" }),
              // GET query string is read by this same route (see run() below)
              onPressed: DoAction(Action.NAVIGATE_PUSH_REPLACE, `/ui/main?toggle=${t.id}`),
            }),
            SizedBox(`#rowGap${t.id}`, { width: 8 }),
            Button(`#del${t.id}`, {
              type: ButtonType.Danger,
              density: ButtonDensity.dense,
              leading: Iconify("delete", { size: 18 }),
              child: Text(`#delText${t.id}`, { text: "Delete" }),
              onPressed: DoAction(Action.NAVIGATE_PUSH_REPLACE, `/ui/main?del=${t.id}`),
            }),
          ],
        }),
      ],
    }),
  });
}

export function run(req: Request, res: Response, _pass: any) {
  // Lightweight mutations via query string, then render fresh state
  if (req.query.toggle) toggleTask(Number(req.query.toggle));
  if (req.query.del) removeTask(Number(req.query.del));

  const total = tasks.length;
  const done = tasks.filter((t) => t.done).length;
  // Text-based progress bar (Progress widget is not exported on main yet)
  const SEGMENTS = 10;
  const filled = total === 0 ? 0 : Math.round((done / total) * SEGMENTS);
  const bar = "▰".repeat(filled) + "▱".repeat(SEGMENTS - filled);

  const scaffold = Scaffold("#mainScaffold", {
    appBar: AppBar("#appBar", {
      leading: Iconify("school", {}),
      title: Text("#appBarText", {
        text: "StudyDeck",
        style: TextStyle({ fontWeight: FontWeight.w600 }),
      }),
      actions: [
        Button("#aboutBtn", {
          type: ButtonType.Normal,
          density: ButtonDensity.icon,
          child: Iconify("info", { }),
          onPressed: DoAction(Action.NAVIGATE, "/ui/about"),
        }),
      ],
    }),
    preActions: [],
    body: SingleChildScrollView("#sch", {
      child: Padding("#pad", {
        padding: EdgeInsets.all(16),
        child: Column("#mainColumn", {
          mainAxisAlignment: MainAxis.start,
          crossAxisAlignment: CrossAxis.stretch,
          children: [
            Text("#progressLabel", {
              text: `${done} of ${total} tasks done`,
              style: TextStyle({ fontSize: 18, fontWeight: FontWeight.w700 }),
            }),
            SizedBox("#g1", { height: 8 }),
            Text("#progressBar", {
              text: bar,
              style: TextStyle({ fontSize: 22 }),
            }),
            SizedBox("#g2", { height: 20 }),

            Text("#addHeader", {
              text: "Add a task",
              style: TextStyle({ fontSize: 16, fontWeight: FontWeight.w600 }),
            }),
            SizedBox("#g3", { height: 8 }),
            TextField("#taskTitle", {
              controller: TextEditingController({}),
              inputType: InputType.text,
              placeholder: Text("#phTitle", { text: "What do you need to study?" }),
            }),
            SizedBox("#g4", { height: 8 }),
            TextField("#taskSubject", {
              controller: TextEditingController({}),
              inputType: InputType.text,
              placeholder: Text("#phSubject", { text: "Subject (e.g. Maths)" }),
            }),
            SizedBox("#g5", { height: 12 }),
            Button("#addBtn", {
              type: ButtonType.Primary,
              leading: Iconify("add", { size: 18 }),
              child: Text("#addBtnText", { text: "Add task" }),
              onPressed: DoAction(
                Action.SUBMIT,
                FormSubmitAction({
                  variables: ["#taskTitle.controller", "#taskSubject.controller"],
                  varNames: ["title", "subject"],
                  callbackPath: "/cb/add_task",
                }),
              ),
            }),

            SizedBox("#g6", { height: 16 }),
            Divider(),
            SizedBox("#g7", { height: 16 }),

            ...(tasks.length === 0
              ? [Text("#empty", { text: "Nothing here yet — add your first task!", align: TextAlign.center })]
              : tasks.flatMap((t) => [taskCard(t), SizedBox(`#sp${t.id}`, { height: 10 })])),

            SizedBox("#g8", { height: 8 }),
            Button("#clearBtn", {
              type: ButtonType.Secondary,
              leading: Iconify("cleaning_services", { size: 18 }),
              child: Text("#clearBtnText", { text: "Clear completed" }),
              onPressed: DoAction(
                Action.SUBMIT,
                FormSubmitAction({ variables: [], varNames: [], callbackPath: "/cb/clear_done" }),
              ),
            }),
          ],
        }),
      }),
    }),
  });

  res.json(scaffold);
}
