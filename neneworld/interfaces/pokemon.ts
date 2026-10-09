import type { Request, Response } from "express";
import { BoxFit, Card, Column, CrossAxis, EdgeInsets, FontWeight, Row } from "@neneys/ui";
import { getJson, safe, cap } from "../lib/api";
import { detailPage, errorCard, favoriteButton, gap, heading, label, netImage } from "../lib/ui";
import { isFav } from "../lib/store";
import { artwork } from "./tab_pokemon";

export const path = "/ui/pokemon";

const bar = (v: number) => {
  const n = Math.max(1, Math.min(10, Math.round((v / 200) * 10)));
  return "▰".repeat(n) + "▱".repeat(10 - n);
};

export async function run(req: Request, res: Response, _pass: any) {
  const pid = String(req.query.id ?? "25").replace(/\D/g, "") || "25";
  const r = await safe(getJson(`https://pokeapi.co/api/v2/pokemon/${pid}`, 5 * 60_000));

  if (!r.ok) return res.json(detailPage("#pkd", "Pokémon", [errorCard("#pkd_err", "this Pokémon", r.error)]));

  const p = r.data;
  const name = cap(String(p.name));
  const types = (p.types ?? []).map((t: any) => cap(t.type.name)).join(" · ");
  const abilities = (p.abilities ?? []).map((a: any) => cap(String(a.ability.name).replace("-", " "))).join(", ");

  const stats = (p.stats ?? []).flatMap((s: any, i: number) => [
    Row(`#pkd_st${i}`, {
      crossAxisAlignment: CrossAxis.center,
      children: [
        label(`#pkd_sn${i}`, cap(String(s.stat.name).replace("special-", "sp. ")).padEnd(14, " "), 12, FontWeight.bold),
        gap(`#pkd_sg${i}`, 0, 8),
        label(`#pkd_sb${i}`, bar(s.base_stat), 13),
        gap(`#pkd_sg2${i}`, 0, 8),
        label(`#pkd_sv${i}`, String(s.base_stat), 12),
      ],
    }),
    gap(`#pkd_sp${i}`, 4),
  ]);

  res.json(
    detailPage("#pkd", name, [
      netImage("#pkd_img", p.sprites?.other?.["official-artwork"]?.front_default ?? artwork(pid), 260, 260, BoxFit.contain),
      gap("#pkd_g1", 8),
      heading("#pkd_name", `${name}  #${String(pid).padStart(4, "0")}`, 24),
      label("#pkd_types", types || "Unknown type", 14),
      gap("#pkd_g2", 12),
      Card("#pkd_info", {
        type: "outlined",
        padding: EdgeInsets.all(14),
        child: Column("#pkd_infoc", {
          crossAxisAlignment: CrossAxis.start,
          children: [
            label("#pkd_h", `Height ${(p.height / 10).toFixed(1)} m · Weight ${(p.weight / 10).toFixed(1)} kg`, 14),
            gap("#pkd_g3", 4),
            label("#pkd_ab", `Abilities: ${abilities}`, 14),
          ],
        }),
      }),
      gap("#pkd_g4", 12),
      Card("#pkd_stats", {
        type: "outlined",
        padding: EdgeInsets.all(14),
        child: Column("#pkd_statsc", {
          crossAxisAlignment: CrossAxis.start,
          children: [heading("#pkd_sh", "Base stats", 16), gap("#pkd_sg", 8), ...stats],
        }),
      }),
      gap("#pkd_g5", 14),
      favoriteButton("#pkd_fav", "pokemon", pid, name, isFav("pokemon", pid)),
    ]),
  );
}
