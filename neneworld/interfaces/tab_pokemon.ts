import type { Request, Response } from "express";
import { Action, BoxFit, Button, ButtonDensity, ButtonType, Card, Column, CrossAxis, DoAction, EdgeInsets, FontWeight, Text, TextAlign } from "@neneys/ui";
import { getJson, safe, cap, rand } from "../lib/api";
import { errorCard, gap, grid, heading, label, netImage, tabPage } from "../lib/ui";

export const path = "/ui/tab_pokemon";

export const artwork = (id: number | string) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

export async function run(_req: Request, res: Response, _pass: any) {
  // A random window of 12 Pokémon each time the tab is opened
  const offset = rand(0, 1000);
  const r = await safe(getJson(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`, 60_000));

  const children: any[] = [
    heading("#pk_h", "Pokédex", 24),
    label("#pk_s", "12 random Pokémon from PokéAPI — tap the tab again to reshuffle.", 14),
    gap("#pk_g", 14),
  ];

  if (!r.ok) {
    children.push(errorCard("#pk_err", "Pokémon", r.error));
  } else {
    const cards = (r.data.results as { name: string; url: string }[]).map((p) => {
      const pid = p.url.match(/pokemon\/(\d+)\//)?.[1] ?? "0";
      const k = `#pk${pid}`;
      return Card(k, {
        type: "outlined",
        padding: EdgeInsets.all(10),
        child: Column(`${k}_c`, {
          crossAxisAlignment: CrossAxis.center,
          children: [
            netImage(`${k}_img`, artwork(pid), 120, 120, BoxFit.contain),
            gap(`${k}_g1`, 6),
            Text(`${k}_n`, { text: cap(p.name), align: TextAlign.center, style: { ...(label(`${k}_x`, "", 15, FontWeight.bold).props.style) } }),
            label(`${k}_id`, `#${pid.padStart(4, "0")}`, 12),
            gap(`${k}_g2`, 8),
            Button(`${k}_btn`, {
              type: ButtonType.Secondary,
              density: ButtonDensity.dense,
              child: Text(`${k}_bt`, { text: "View" }),
              onPressed: DoAction(Action.NAVIGATE, `/ui/pokemon?id=${pid}`),
            }),
          ],
        }),
      });
    });
    children.push(...grid("#pkgrid", cards, 2));
  }

  res.json(tabPage("#pokemon", children));
}
