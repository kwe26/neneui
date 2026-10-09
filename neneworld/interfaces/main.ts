import type { Request, Response } from "express";
import {
  Action, AppBar, Button, ButtonDensity, ButtonType, DoAction, Iconify, NavType, NeneDisplay,
  NeneNavbottom, NeneNavItem, Scaffold, Text,
} from "@neneys/ui";

// Initial route MUST be /ui/main
export const path = "/ui/main";

export function run(_req: Request, res: Response, _pass: any) {
  res.json(
    Scaffold("#mainScaffold", {
      appBar: AppBar("#appBar", {
        leading: Iconify("explore", {}),
        title: Text("#appBarTitle", { text: "NeneWorld" }),
        actions: [
          Button("#aboutBtn", {
            type: ButtonType.Normal,
            density: ButtonDensity.icon,
            child: Iconify("info", {}),
            onPressed: DoAction(Action.NAVIGATE, "/ui/about"),
          }),
        ],
      }),

      // The body swaps between these routes as the bottom nav index changes.
      // Each route returns a plain widget (not a Scaffold).
      body: NeneDisplay({
        urlMap: {
          0: "/ui/tab_home",
          1: "/ui/tab_pokemon",
          2: "/ui/tab_art",
          3: "/ui/tab_countries",
        },
      }),

      // Switch to `type: NavType.float` for the floating pill style.
      bottom: NeneNavbottom({
        type: NavType.normal,
        items: [
          NeneNavItem({ index: 0, title: "Home", icon: Iconify("home", {}) }),
          NeneNavItem({ index: 1, title: "Pokédex", icon: Iconify("catching-pokemon", {}) }),
          NeneNavItem({ index: 2, title: "Art", icon: Iconify("palette", {}) }),
          NeneNavItem({ index: 3, title: "Countries", icon: Iconify("public", {}) }),
        ],
      }),
    }),
  );
}
