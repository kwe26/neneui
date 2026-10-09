import type { Request, Response } from "express";
import { BoxFit, Card, Column, CrossAxis, EdgeInsets, FontWeight } from "@neneys/ui";
import { getJson, safe, stripHtml } from "../lib/api";
import { detailPage, errorCard, favoriteButton, gap, heading, label, netImage } from "../lib/ui";
import { isFav } from "../lib/store";

export const path = "/ui/artwork";

export async function run(req: Request, res: Response, _pass: any) {
  const aid = String(req.query.id ?? "").replace(/\D/g, "");
  if (!aid) return res.json(detailPage("#ad", "Artwork", [errorCard("#ad_err", "artwork", "missing id")]));

  const r = await safe(
    getJson(
      `https://openaccess-api.clevelandart.org/api/artworks/${aid}`,
      5 * 60_000,
    ),
  );
  if (!r.ok) return res.json(detailPage("#ad", "Artwork", [errorCard("#ad_err", "artwork", r.error)]));

  const a = r.data.data;
  const title = String(a.title ?? "Untitled");
  const desc = a.description ? stripHtml(String(a.description)) : "";

  const rows = [
    ["Artist", a.creators?.[0]?.description],
    ["Date", a.creation_date],
    ["Medium", a.technique],
    ["Culture", a.culture?.join(", ")],
    ["Dimensions", a.measurements],
    ["Credit", a.creditline],
  ].filter(([, v]) => v);

  res.json(
    detailPage("#ad", "Artwork", [
      ...(a.images?.web?.url ? [netImage("#ad_img", a.images.web.url, 320, 260, BoxFit.contain), gap("#ad_g0", 10)] : []),
      heading("#ad_name", title, 22),
      gap("#ad_g1", 8),
      ...(desc ? [label("#ad_desc", desc, 14), gap("#ad_g2", 10)] : []),
      Card("#ad_card", {
        type: "outlined",
        padding: EdgeInsets.all(14),
        child: Column("#ad_cardc", {
          crossAxisAlignment: CrossAxis.start,
          children: rows.flatMap(([k, v], i) => [
            label(`#ad_k${i}`, String(k), 12, FontWeight.w500),
            label(`#ad_v${i}`, String(v), 14),
            gap(`#ad_rg${i}`, 8),
          ]),
        }),
      }),
      gap("#ad_g3", 14),
      favoriteButton("#ad_fav", "art", aid, title, isFav("art", aid)),
    ]),
  );
}
