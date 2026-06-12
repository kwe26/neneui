import { TextStyle, type TextStyleProps } from "../core/TextStyle";
import { TextAlign, TextOverflow } from "../widgets";

export interface TextProps {
    text: any,
    align?: TextAlign,
    overflow?: TextOverflow
    style?: TextStyleProps
}

export function Text(id: string, {
    text = "",
    align = TextAlign.start,
    overflow = TextOverflow.visible,
    style = TextStyle({})
}: TextProps) {
    return {
        id,
        name: "Text",
        props: {
            text,
            align,
            overflow,
            style
        }
    }
}