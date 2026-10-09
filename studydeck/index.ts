import { NeneServer, Theme, ColorScheme, Brightness } from "@neneys/ui";

const themeLight = Theme({
  colorScheme: ColorScheme({
    brightness: Brightness.light,
    background: "#F6F7FB",
    foreground: "#14161F",
    card: "#FFFFFF",
    cardForeground: "#14161F",
    primary: "#4F46E5",
    primaryForeground: "#FFFFFF",
    secondary: "#E7E9F7",
    secondaryForeground: "#2B2F6B",
    muted: "#EDEEF4",
    mutedForeground: "#667085",
    accent: "#F4B942",
    accentForeground: "#3A2905",
    destructive: "#D94F4F",
    border: "#E1E3EC",
  }),
});

const themeDark = Theme({
  colorScheme: ColorScheme({
    brightness: Brightness.dark,
    background: "#0F1117",
    foreground: "#ECEEF6",
    card: "#171A23",
    cardForeground: "#ECEEF6",
    primary: "#818CF8",
    primaryForeground: "#0F1117",
    secondary: "#232744",
    secondaryForeground: "#DDE0FF",
    muted: "#1E212C",
    mutedForeground: "#9AA1B5",
    accent: "#F4B942",
    accentForeground: "#2A1E03",
    destructive: "#F07A7A",
    border: "#2A2E3B",
  }),
});

NeneServer({
  port: 3500,
  uiPath: "./interfaces",
  callbackPath: "./callbacks",
  verbose: true,
  themeLight,
  themeDark,
});
