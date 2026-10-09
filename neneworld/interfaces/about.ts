import type { Request, Response } from "express";
import { Card, Column, CrossAxis, EdgeInsets, FontWeight } from "@neneys/ui";
import { detailPage, gap, heading, label } from "../lib/ui";

export const path = "/ui/about";

const APIS: [string, string][] = [
  ["Open-Meteo", "Live weather (no key)"],
  ["Dog CEO", "Random dog photos"],
  ["Advice Slip", "Advice of the day"],
  ["PokéAPI + sprites", "Pokédex list, details, official artwork"],
  ["Art Institute of Chicago", "Artworks + IIIF images"],
  ["REST Countries", "Country data + flags"],
];

export function run(_req: Request, res: Response, pass: any) {
  res.json(
    detailPage("#about", "About", [
      heading("#about_h", "NeneWorld", 24),
      label("#about_p", "Every pixel is described by a TypeScript server and rendered natively in Flutter by NeneUI. Colors come only from the server theme, so light/dark just works.", 14),
      gap("#about_g", 14),
      Card("#about_card", {
        type: "outlined",
        padding: EdgeInsets.all(14),
        child: Column("#about_cc", {
          crossAxisAlignment: CrossAxis.start,
          children: [
            heading("#about_ah", "Public APIs used", 16),
            gap("#about_ag", 8),
            ...APIS.flatMap(([n, d], i) => [label(`#about_n${i}`, n, 14, FontWeight.w500), label(`#about_d${i}`, d, 13), gap(`#about_s${i}`, 8)]),
          ],
        }),
      }),
      gap("#about_g2", 10),
      label("#about_port", `Server port: ${pass.port}`, 12),
    ]),
  );
}
