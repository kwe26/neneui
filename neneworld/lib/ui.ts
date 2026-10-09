import {
  Action, AppBar, Button, ButtonDensity, ButtonType, Card, Column, CrossAxis, DoAction, EdgeInsets,
  Empty, Expanded, FontWeight, FormSubmitAction, Iconify, Image, BoxFit, NetworkImage, Padding,
  Row, Scaffold, SingleChildScrollView, SizedBox, Text, TextAlign, TextOverflow, TextStyle, MainAxis,
} from "@neneys/ui";

// NOTE: no color parameters anywhere in this file — colors come from the theme
// (light/dark) so widgets adapt automatically.

/** Unique-id generator: ids must be unique per rendered tree. */
export function ids(prefix: string) {
  let n = 0;
  return () => `#${prefix}${n++}`;
}

export function heading(id: string, text: string, size = 20) {
  return Text(id, { text, style: TextStyle({ fontSize: size, fontWeight: FontWeight.bold }) });
}

export function label(id: string, text: string, size = 13, weight = FontWeight.w400, overflow = TextOverflow.visible) {
  return Text(id, { text, overflow, style: TextStyle({ fontSize: size, fontWeight: weight }) });
}

export const gap = (id: string, h = 12, w?: number) => SizedBox(id, w ? { width: w, height: h } : { height: h });

/** Network image with theme-friendly loading/error placeholders (no colors). */
export function netImage(id: string, url: string, width: number, height: number, fit = BoxFit.cover) {
  return Image(id, {
    path: NetworkImage(url),
    width,
    height,
    fit,
    loadingWidget: Text(`${id}_l`, { text: "Loading…", align: TextAlign.center }),
    errorWidget: Text(`${id}_e`, { text: "Image unavailable", align: TextAlign.center }),
  });
}

export function errorCard(id: string, what: string, error: string) {
  return Card(id, {
    type: "outlined",
    padding: EdgeInsets.all(14),
    child: Column(`${id}c`, {
      crossAxisAlignment: CrossAxis.start,
      children: [
        Row(`${id}r`, {
          crossAxisAlignment: CrossAxis.center,
          children: [Iconify("cloud-off", { size: 20 }), gap(`${id}g`, 0, 8), heading(`${id}h`, `Couldn't load ${what}`, 15)],
        }),
        gap(`${id}g2`, 6),
        label(`${id}t`, `${error}. Tap this tab again to retry.`),
      ],
    }),
  });
}

/** Body of a NeneDisplay tab: a scrollable padded column (NOT a Scaffold). */
export function tabPage(id: string, children: any[]) {
  return SingleChildScrollView(`${id}_scroll`, {
    child: Padding(`${id}_pad`, {
      padding: EdgeInsets.all(16),
      child: Column(`${id}_col`, { crossAxisAlignment: CrossAxis.stretch, children }),
    }),
  });
}

/** Full pushed page (detail screens) with a back button in the AppBar. */
export function detailPage(id: string, title: string, children: any[]) {
  return Scaffold(`${id}_scaffold`, {
    appBar: AppBar(`${id}_bar`, {
      leading: Button(`${id}_back`, {
        type: ButtonType.Normal,
        density: ButtonDensity.icon,
        child: Iconify("arrow-back", {}),
        onPressed: DoAction(Action.NAVIGATE_POP, ""),
      }),
      title: Text(`${id}_title`, { text: title, overflow: TextOverflow.ellipsis }),
    }),
    body: tabPage(id, children),
  });
}

/** Lay items out in rows of `perRow` equal-width cells. */
export function grid(id: string, items: any[], perRow = 2) {
  const rows: any[] = [];
  for (let i = 0; i < items.length; i += perRow) {
    const slice = items.slice(i, i + perRow);
    while (slice.length < perRow) slice.push(Empty());
    rows.push(
      Row(`${id}_row${i}`, {
        crossAxisAlignment: CrossAxis.start,
        mainAxisAlignment: MainAxis.spaceBetween,
        children: slice.flatMap((c, j) => [
          Expanded(`${id}_x${i}_${j}`, { flex: 1, child: c }),
          ...(j < perRow - 1 ? [gap(`${id}_s${i}_${j}`, 0, 10)] : []),
        ]),
      }),
      gap(`${id}_rg${i}`, 10),
    );
  }
  return rows;
}

export function favoriteButton(id: string, kind: string, itemId: string, name: string, isFavNow: boolean) {
  return Button(id, {
    type: isFavNow ? ButtonType.Secondary : ButtonType.Primary,
    leading: Iconify(isFavNow ? "favorite" : "favorite-outline", { size: 18 }),
    child: Text(`${id}_t`, { text: isFavNow ? "Remove favorite" : "Add to favorites" }),
    onPressed: DoAction(
      Action.SUBMIT,
      FormSubmitAction({
        variables: [],
        varNames: [],
        callbackPath: `/cb/favorite?kind=${kind}&id=${encodeURIComponent(itemId)}&name=${encodeURIComponent(name)}`,
      }),
    ),
  });
}
