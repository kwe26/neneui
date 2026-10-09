import type { Request, Response } from "express";
import { Action, Callback, DoAction } from "@neneys/ui";
import { addTask } from "../store";

export const path = "/cb/add_task";

export async function run(req: Request, res: Response, _pass: any) {
  const title = String(req.body?.title ?? "").trim();
  const subject = String(req.body?.subject ?? "").trim();

  if (!title) {
    return res.json(Callback({ callbacks: [DoAction(Action.SHOW_TOAST, "Please enter a task title")] }));
  }

  addTask(title, subject);
  res.json(
    Callback({
      callbacks: [
        DoAction(Action.SHOW_TOAST, `Added "${title}"`),
        // Replace the current page with a fresh render (clears the form)
        DoAction(Action.NAVIGATE_PUSH_REPLACE, "/ui/main"),
      ],
    }),
  );
}
