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
    fontSize = 14,
    fontWeight = FontWeight.w400,
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