import { NeneServer, Theme, ColorScheme, Brightness } from "@neneys/ui";

// Only the *theme* carries colors. Widgets never set colors, so every screen
// follows light/dark automatically.
const themeLight = Theme({
  colorScheme: ColorScheme({
    brightness: Brightness.light,
    background: "#F7F8FC",
    foreground: "#12141C",
    card: "#FFFFFF",
    cardForeground: "#12141C",
    primary: "#0E7C86",
    primaryForeground: "#FFFFFF",
    secondary: "#DDF1F3",
    secondaryForeground: "#0A4D54",
    muted: "#ECEEF4",
    mutedForeground: "#667085",
    accent: "#F2A93B",
    accentForeground: "#2E1F02",
    destructive: "#D64545",
    border: "#E0E3EC",
  }),
  radius: 0.8,
});

const themeDark = Theme({
  colorScheme: ColorScheme({
    brightness: Brightness.dark,
    background: "#0E1016",
    foreground: "#ECEFF7",
    card: "#171A22",
    cardForeground: "#ECEFF7",
    primary: "#4FD1C5",
    primaryForeground: "#06201D",
    secondary: "#16302F",
    secondaryForeground: "#C8F3EE",
    muted: "#1E222C",
    mutedForeground: "#98A0B3",
    accent: "#F2A93B",
    accentForeground: "#2E1F02",
    destructive: "#F07878",
    border: "#2A2F3B",
  }),
  radius: 0.8,
});

NeneServer({
  port: 3500,
  uiPath: "./interfaces",     // NOTE: keep flat — every .ts here is a route
  callbackPath: "./callbacks",
  verbose: true,
  themeLight,
  themeDark,
});
