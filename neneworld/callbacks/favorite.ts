import type { Request, Response } from "express";
import { Action, Callback, DoAction } from "@neneys/ui";
import { toggleFav } from "../lib/store";

export const path = "/cb/favorite";

// Called by the "Add to favorites" button: POST /cb/favorite?kind=&id=&name=
export async function run(req: Request, res: Response, _pass: any) {
  const kind = req.query.kind === "art" ? "art" : "pokemon";
  const id = String(req.query.id ?? "");
  const name = String(req.query.name ?? id);
  if (!id) return res.json(Callback({ callbacks: [DoAction(Action.SHOW_TOAST, "Missing item")] }));

  const added = toggleFav({ kind, id, name });
  res.json(Callback({ callbacks: [DoAction(Action.SHOW_TOAST, added ? `Added ${name} to favorites` : `Removed ${name} from favorites`)] }));
}
