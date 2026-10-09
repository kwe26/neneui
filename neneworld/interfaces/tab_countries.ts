import type { Request, Response } from "express";
import { BoxFit, Card, Column, CrossAxis, EdgeInsets, FontWeight, Row, TextOverflow, Expanded } from "@neneys/ui";
import { getJson, safe, pick, shuffle, cap } from "../lib/api";
import { errorCard, gap, heading, label, netImage, tabPage } from "../lib/ui";

export const path = "/ui/tab_countries";

const REGIONS = ["africa", "americas", "asia", "europe", "oceania"];
const compact = (n: number) => new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
type Country = {
  name?: { common?: string };
  capital?: string[];
  population?: number;
  cca2?: string;
  region?: string;
};

export async function run(_req: Request, res: Response, _pass: any) {
  const region = pick(REGIONS);
  const r = await safe(
    getJson<unknown>(
      "https://raw.githubusercontent.com/mledoze/countries/master/countries.json",
      30 * 60_000,
    ),
  );

  const children: any[] = [
    heading("#ct_h", "Countries", 24),
    label("#ct_s", `10 random countries in ${cap(region)} — from REST Countries.`, 14),
    gap("#ct_g", 14),
  ];

  if (!r.ok) {
    children.push(errorCard("#ct_err", "countries", r.error));
  } else if (!Array.isArray(r.data)) {
    children.push(errorCard("#ct_err", "countries", "The countries API returned an invalid response."));
  } else {
    const countries = r.data.filter((c): c is Country => {
      if (!c || typeof c !== "object") return false;
      const country = c as Country;
      return country.region?.toLowerCase() === region;
    });

    for (const c of shuffle(countries).slice(0, 10)) {
      const k = `#ct_${c.cca2}`;
      children.push(
        Card(k, {
          type: "outlined",
          padding: EdgeInsets.all(12),
          child: Row(`${k}_r`, {
            crossAxisAlignment: CrossAxis.center,
            children: [
              netImage(
                `${k}_flag`,
                c.cca2 ? `https://flagcdn.com/w160/${c.cca2.toLowerCase()}.png` : "",
                84,
                56,
                BoxFit.cover,
              ),
              gap(`${k}_g`, 0, 12),
              Expanded(`${k}_x`, {
                flex: 1,
                child: Column(`${k}_c`, {
                  crossAxisAlignment: CrossAxis.start,
                  children: [
                    label(`${k}_n`, c.name?.common ?? "—", 16, FontWeight.bold, TextOverflow.ellipsis),
                    label(`${k}_cap`, `Capital: ${(c.capital ?? ["—"]).join(", ")}`, 13, FontWeight.w400, TextOverflow.ellipsis),
                    label(`${k}_pop`, `Population: ${c.population == null ? "—" : compact(c.population)}`, 13),
                  ],
                }),
              }),
            ],
          }),
        }),
        gap(`${k}_sp`, 10),
      );
    }
  }

  res.json(tabPage("#countries", children));
}
