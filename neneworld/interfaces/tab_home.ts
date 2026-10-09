import type { Request, Response } from "express";
import { Card, Column, CrossAxis, EdgeInsets, FontWeight, Iconify, Row, Text, TextStyle, BoxFit, CircularProgressIndicator } from "@neneys/ui";
import { getJson, safe, cap } from "../lib/api";
import { favorites } from "../lib/store";
import { errorCard, gap, heading, ids, label, netImage, tabPage } from "../lib/ui";

export const path = "/ui/tab_home";

const CITIES = [
  { name: "Tokyo", lat: 35.68, lon: 139.69 },
  { name: "London", lat: 51.51, lon: -0.13 },
  { name: "New York", lat: 40.71, lon: -74.01 },
  { name: "Sydney", lat: -33.87, lon: 151.21 },
];

// WMO weather codes -> label + Iconify (material-symbols) icon
function describe(code: number): [string, string] {
  if (code === 0) return ["Clear sky", "sunny"];
  if (code <= 2) return ["Partly cloudy", "partly-cloudy-day"];
  if (code === 3) return ["Overcast", "cloud"];
  if (code <= 48) return ["Fog", "foggy"];
  if (code <= 67) return ["Rain", "rainy"];
  if (code <= 77) return ["Snow", "ac-unit"];
  if (code <= 82) return ["Showers", "rainy"];
  if (code <= 86) return ["Snow showers", "ac-unit"];
  return ["Thunderstorm", "thunderstorm"];
}

export async function run(_req: Request, res: Response, _pass: any) {
  const id = ids("home");

  // Fire all public API calls in parallel
  const [weather, dog, advice] = await Promise.all([
    Promise.all(
      CITIES.map((c) =>
        safe(
          getJson(
            `https://api.open-meteo.com/v1/forecast?latitude=${c.lat}&longitude=${c.lon}&current=temperature_2m,weather_code,wind_speed_10m`,
            10 * 60_000, // weather: cache 10 min
          ),
        ),
      ),
    ),
    safe(getJson("https://dog.ceo/api/breeds/image/random")),
    safe(getJson("https://api.adviceslip.com/advice")),
  ]);

  const children: any[] = [
    heading(id(), "Welcome back 👋", 24),
    label(id(), "Live data from public APIs, rendered natively from a TypeScript server.", 14),
    gap(id(), 16),
  ];

  // ---- Weather (Open-Meteo) ----
  const weatherRows = CITIES.flatMap((c, i) => {
    const r = weather[i]!;
    if (!r.ok) {
      return [Row(id(), { children: [label(id(), `${c.name}: unavailable`)] }), gap(id(), 6)];
    }
    const cur = r.data?.current ?? {};
    const [desc, icon] = describe(Number(cur.weather_code ?? 0));
    const unit = r.data?.current_units?.temperature_2m ?? "°C";
    return [
      Row(id(), {
        crossAxisAlignment: CrossAxis.center,
        children: [
          Iconify(icon, { size: 26 }),
          gap(id(), 0, 10),
          Column(id(), {
            crossAxisAlignment: CrossAxis.start,
            children: [
              label(id(), c.name, 15, FontWeight.bold),
              label(id(), `${desc} · wind ${cur.wind_speed_10m ?? "–"} km/h`, 12),
            ],
          }),
          gap(id(), 0, 16),
          Text(id(), {
            text: `${cur.temperature_2m ?? "–"}${unit}`,
            style: TextStyle({ fontSize: 20, fontWeight: FontWeight.bold }),
          }),
        ],
      }),
      gap(id(), 12),
    ];
  });

  children.push(
    Card(id(), {
      type: "outlined",
      padding: EdgeInsets.all(14),
      child: Column(id(), {
        crossAxisAlignment: CrossAxis.start,
        children: [heading(id(), "Weather now", 16), gap(id(), 10), ...weatherRows],
      }),
    }),
    gap(id(), 14),
  );

  // ---- Random dog (Dog CEO) ----
  if (dog.ok && dog.data?.message) {
    const url: string = dog.data.message;
    const breedSlug = url.match(/breeds\/([^/]+)\//)?.[1] ?? "dog";
    const breed = cap(breedSlug.split("-").reverse().join(" "));
    children.push(
      Card(id(), {
        type: "outlined",
        padding: EdgeInsets.all(14),
        child: Column(id(), {
          crossAxisAlignment: CrossAxis.start,
          children: [
            heading(id(), "Dog of the moment 🐶", 16),
            label(id(), breed, 13),
            gap(id(), 10),
            netImage(id(), url, 300, 220, BoxFit.cover),
          ],
        }),
      }),
    );
  } else {
    children.push(errorCard(id(), "dog photo", dog.ok ? "empty response" : dog.error));
  }
  children.push(gap(id(), 14));

  // ---- Advice (Advice Slip) ----
  if (advice.ok && advice.data?.slip?.advice) {
    children.push(
      Card(id(), {
        type: "outlined",
        padding: EdgeInsets.all(14),
        child: Column(id(), {
          crossAxisAlignment: CrossAxis.start,
          children: [heading(id(), "Advice of the day", 16), gap(id(), 6), label(id(), `“${advice.data.slip.advice}”`, 14)],
        }),
      }),
    );
  } else {
    children.push(errorCard(id(), "advice", advice.ok ? "empty response" : advice.error));
  }
  children.push(gap(id(), 14));

  // ---- Favorites (state saved through a callback) ----
  const favList = [...favorites.values()];
  children.push(
    Card(id(), {
      type: "outlined",
      padding: EdgeInsets.all(14),
      child: Column(id(), {
        crossAxisAlignment: CrossAxis.start,
        children: [
          heading(id(), `Favorites (${favList.length})`, 16),
          gap(id(), 6),
          ...(favList.length === 0
            ? [label(id(), "Nothing yet — open a Pokémon or artwork and tap “Add to favorites”.")]
            : favList.map((f) => label(id(), `${f.kind === "pokemon" ? "⚡" : "🖼️"} ${f.name}`, 14))),
        ],
      }),
    }),
  );

  res.json(tabPage("#home", children));
}
