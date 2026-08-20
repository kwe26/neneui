export enum Brightness {
    light = "light",
    dark = "dark"
}

export interface ColorSchemeProps {
    brightness?: Brightness,
    background?: string,
    foreground?: string,
    card?: string,
    cardForeground?: string,
    popover?: string,
    popoverForeground?: string,
    primary?: string,
    primaryForeground?: string,
    secondary?: string,
    secondaryForeground?: string,
    muted?: string,
    mutedForeground?: string,
    accent?: string,
    accentForeground?: string,
    destructive?: string,
    destructiveForeground?: string,
    border?: string,
    input?: string,
    ring?: string,
    chart1?: string,
    chart2?: string,
    chart3?: string,
    chart4?: string,
    chart5?: string
}

export function ColorScheme({
    brightness = Brightness.light,
    background = "#FFFFFF",
    foreground = "#09090B",
    card = "#FFFFFF",
    cardForeground = "#09090B",
    popover = "#FFFFFF",
    popoverForeground = "#09090B",
    primary = "#18181B",
    primaryForeground = "#FAFAFA",
    secondary = "#F4F4F5",
    secondaryForeground = "#18181B",
    muted = "#F4F4F5",
    mutedForeground = "#71717A",
    accent = "#F4F4F5",
    accentForeground = "#18181B",
    destructive = "#EF4444",
    destructiveForeground = "#FAFAFA",
    border = "#E4E4E7",
    input = "#E4E4E7",
    ring = "#09090B",
    chart1 = "#E76E50",
    chart2 = "#2A9D90",
    chart3 = "#274754",
    chart4 = "#E8C468",
    chart5 = "#F4A462",
}: ColorSchemeProps) {

    return {
        brightness,
        background,
        foreground,
        card,
        cardForeground,
        popover,
        popoverForeground,
        primary,
        primaryForeground,
        secondary,
        secondaryForeground,
        muted,
        mutedForeground,
        accent,
        accentForeground,
        destructive,
        destructiveForeground,
        border,
        input,
        ring,
        chart1,
        chart2,
        chart3,
        chart4,
        chart5,
    };
}

export enum Density {
    compactDensity = "compactDensity",
    defaultDensity = "defaultDensity",
    reducedDensity = "reducedDensity",
    spaciousDensity = "spaciousDensity"
}

export interface ThemeProps {
    colorScheme?: ColorSchemeProps,
    radius?: number,
    scaling?: number,
    surfaceOpacity?: number,
    surfaceBlur?: number,
    density?: Density
}

export function Theme({
    colorScheme = ColorScheme({}),
    radius = 0.5,
    scaling = 1,
    surfaceOpacity = 0.9,
    surfaceBlur = 4.0,
    density = Density.defaultDensity
}: ThemeProps) {
    return {
        colorScheme,
        radius,
        scaling,
        surfaceOpacity,
        surfaceBlur,
        density
    }
}

