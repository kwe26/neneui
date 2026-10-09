import type { Request, Response } from "express";
import { Action, BoxFit, Button, ButtonType, Card, Column, CrossAxis, DoAction, EdgeInsets, FontWeight, Iconify, TextOverflow } from "@neneys/ui";
import { getJson, safe, rand } from "../lib/api";
import { errorCard, gap, heading, label, netImage, tabPage } from "../lib/ui";

export const path = "/ui/tab_art";

type Artwork = {
  id: number;
  title?: string;
  creation_date?: string;
  images?: { web?: { url?: string } };
  creators?: { description?: string; name?: string }[];
};

export async function run(_req: Request, res: Response, _pass: any) {
  const skip = rand(0, 41_000);
  const r = await safe(
    getJson<unknown>(
      `https://openaccess-api.clevelandart.org/api/artworks/?has_image=1&limit=10&skip=${skip}`,
      60_000,
    ),
  );

  const children: any[] = [
    heading("#art_h", "Art Gallery", 24),
    label("#art_s", "Random works from the Cleveland Museum of Art collection.", 14),
    gap("#art_g", 14),
  ];

  if (!r.ok) {
    children.push(errorCard("#art_err", "artworks", r.error));
  } else if (!r.data || typeof r.data !== "object" || !Array.isArray((r.data as { data?: unknown }).data)) {
    children.push(errorCard("#art_err", "artworks", "The art API returned an invalid response."));
  } else {
    const works = ((r.data as { data: unknown[] }).data as Artwork[]).filter((a) => a.images?.web?.url).slice(0, 8);

    for (const a of works) {
      const k = `#art${a.id}`;
      children.push(
        Card(k, {
          type: "outlined",
          padding: EdgeInsets.all(12),
          child: Column(`${k}_c`, {
            crossAxisAlignment: CrossAxis.start,
            children: [
              netImage(`${k}_img`, a.images!.web!.url!, 300, 200, BoxFit.cover),
              gap(`${k}_g1`, 8),
              label(`${k}_t`, String(a.title ?? "Untitled"), 16, FontWeight.bold, TextOverflow.ellipsis),
              label(`${k}_a`, a.creators?.[0]?.description ?? "Unknown artist", 13, FontWeight.w400, TextOverflow.ellipsis),
              label(`${k}_d`, String(a.creation_date ?? ""), 12),
              gap(`${k}_g2`, 8),
              Button(`${k}_btn`, {
                type: ButtonType.Secondary,
                leading: Iconify("visibility", { size: 18 }),
                child: label(`${k}_bt`, "Details", 14),
                onPressed: DoAction(Action.NAVIGATE, `/ui/artwork?id=${a.id}`),
              }),
            ],
          }),
        }),
        gap(`${k}_sp`, 12),
      );
    }
    if (works.length === 0) children.push(label("#art_none", "No artworks with images on this page. Tap the tab again."));
  }

  res.json(tabPage("#artwork_tab", children));
}
