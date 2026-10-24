import { Brightness, ColorScheme, Density, Theme } from "./lib/http/theme";
import { NeneServer, ReqType, Text } from "./lib/widgets";
import { NenePayments, RazorpayGateway } from "./@neneys/payments/lib/index"
import { JavaScriptEngine } from "./lib/http/javascript";

const theme = Theme({
    colorScheme: ColorScheme({
        brightness: Brightness.light,

        background: "#F5F7F2",
        foreground: "#17221C",

        card: "#FFFFFF",
        cardForeground: "#17221C",

        popover: "#FFFFFF",
        popoverForeground: "#17221C",

        primary: "#087F5B",
        primaryForeground: "#F4FFF9",

        secondary: "#DDEFE7",
        secondaryForeground: "#14523F",

        muted: "#E8EEE9",
        mutedForeground: "#64736A",

        accent: "#F4B942",
        accentForeground: "#3A2905",

        destructive: "#D94F4F",
        destructiveForeground: "#FFF7F7",

        border: "#CBD8D0",
        input: "#CBD8D0",
        ring: "#F4B942",

        chart1: "#087F5B",
        chart2: "#F4B942",
        chart3: "#E76F51",
        chart4: "#6C63FF",
        chart5: "#36A9A0",
    }),

    radius: 0,
    scaling: 1,
    surfaceOpacity: 0.92,
    surfaceBlur: 6,
    density: Density.defaultDensity,
});

NeneServer({
    port: 3500,
    uiPath: "./example_ui",
    verbose: true,
    themeDark: theme,
    flutterWebPath: "D:\\ProjectAB\\neneui\\nene_tester\\build\\web",
    phpPath: "D:\\Software\\php-8.5.12-nts-Win32-vs17-x64\\php.exe",
    reqType: ReqType.POST,
    wss: {
        path: "/ws",
        onConnection(socket, req, pass) {
            console.log("A NeneUI client connected");
        },
    },
    jsEngine: JavaScriptEngine({
        enabled: false
    }),
    captureErrors: true,
    themeLight: theme,
    callbackPath: "./example_callback"
})
