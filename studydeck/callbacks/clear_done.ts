import type { Request, Response } from "express";
import { Action, Callback, DoAction } from "@neneys/ui";
import { clearDone } from "../store";

export const path = "/cb/clear_done";

export async function run(_req: Request, res: Response, _pass: any) {
  clearDone();
  res.json(
    Callback({
      callbacks: [
        DoAction(Action.SHOW_TOAST, "Cleared completed tasks"),
        DoAction(Action.NAVIGATE_PUSH_REPLACE, "/ui/main"),
      ],
    }),
  );
}
