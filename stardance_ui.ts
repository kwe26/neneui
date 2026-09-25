import { Brightness, ColorScheme, Density, Theme } from "./lib/http/theme";
import { NeneServer } from "./lib/widgets";
import { NenePayments, RazorpayGateway } from "./@neneys/payments/lib/index"

const theme = Theme({
    colorScheme: ColorScheme({
        brightness: Brightness.light,

        // Main page background
        background: "#221e50",
        foreground: "#F5F0FF",

        // Cards / panels
        card: "#0F0C28",
        cardForeground: "#F5F0FF",

        // Popovers / floating surfaces
        popover: "#15112F",
        popoverForeground: "#F5F0FF",

        // Main interactive color
        primary: "#C58BE5",
        primaryForeground: "#100A1F",

        // Secondary controls / tabs
        secondary: "#3B3F5F",
        secondaryForeground: "#F1EDFF",

        // Muted areas and text
        muted: "#252340",
        mutedForeground: "#A9A5BE",

        // Highlight / accent
        accent: "#F5D76E",
        accentForeground: "#f0edf8",

        // Errors / destructive actions
        destructive: "#E56B7A",
        destructiveForeground: "#FFF5F7",

        // Borders / inputs
        border: "#555170",
        input: "#34324D",
        ring: "#D49AF0",

        // Charts
        chart1: "#C58BE5",
        chart2: "#F5D76E",
        chart3: "#E56B7A",
        chart4: "#6C63FF",
        chart5: "#55C7C0",
    }),

    radius: 0,
    scaling: 1,
    surfaceOpacity: 0.92,
    surfaceBlur: 6,
    density: Density.defaultDensity,
});

NeneServer({
    port: 3700,
    uiPath: "./stardance_exampleui",
    verbose: true,
    //themeDark: theme,
    captureErrors: true,
    //themeLight: theme,
    callbackPath: "./example_callback"
})