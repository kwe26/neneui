import { FontStyle, FontWeight, TextDecoration, Colors } from "./core";

export interface TextStyleProps {
    height?: number,
    fontSize?: number,
    fontWeight?: FontWeight,
    color?: string,
    decoration?: TextDecoration,
    fontStyle?: FontStyle
}

export function TextStyle({
    height = 1.0,
    fontSize = 12,
    fontWeight = FontWeight.w300,
    color = Colors.black,
    decoration = TextDecoration.none,
    fontStyle = FontStyle.normal
}: TextStyleProps) {
    return {
        height,
        fontSize,
        fontWeight,
        color,
        decoration,
        fontStyle
    }
}