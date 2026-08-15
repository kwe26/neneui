"use client";

import React from "react";
import { TextAlign, TextOverflow, FontWeight, FontStyle, TextDecoration, type TextStyleProps } from "@/lib/core";
import { useDaikon } from "@/lib/context";
import { cn } from "@/lib/utils";

export interface TextWidgetProps {
    id?: string;
    text?: any;
    align?: TextAlign | string;
    overflow?: TextOverflow | string;
    style?: TextStyleProps;
}

const alignMap: Record<string, string> = {
    [TextAlign.left]: "text-left",
    [TextAlign.right]: "text-right",
    [TextAlign.center]: "text-center",
    [TextAlign.justify]: "text-justify",
    [TextAlign.start]: "text-start",
    [TextAlign.end]: "text-end",
};

const fontWeightMap: Record<string, string> = {
    [FontWeight.bold]: "font-bold",
    [FontWeight.w100]: "font-thin",
    [FontWeight.w200]: "font-extralight",
    [FontWeight.w300]: "font-light",
    [FontWeight.w400]: "font-normal",
    [FontWeight.w500]: "font-medium",
    [FontWeight.w600]: "font-semibold",
    [FontWeight.w700]: "font-bold",
    [FontWeight.w800]: "font-extrabold",
    [FontWeight.w900]: "font-black",
};

export default function TextWidget({
    text = "",
    align = TextAlign.start,
    overflow = TextOverflow.visible,
    style = {}
}: TextWidgetProps) {
    const { parseVariable } = useDaikon();
    const renderedText = parseVariable(text);

    const inlineStyle: React.CSSProperties = {};
    if (style.fontSize) inlineStyle.fontSize = `${style.fontSize}px`;
    if (style.color) inlineStyle.color = style.color;
    if (style.height) inlineStyle.lineHeight = style.height;
    if (style.fontStyle === FontStyle.italic) inlineStyle.fontStyle = "italic";
    if (style.decoration === TextDecoration.underline) inlineStyle.textDecoration = "underline";
    if (style.decoration === TextDecoration.lineThrough) inlineStyle.textDecoration = "line-through";
    if (style.decoration === TextDecoration.overline) inlineStyle.textDecoration = "overline";

    const alignClass = alignMap[align] || "text-start";
    const weightClass = style.fontWeight ? (fontWeightMap[style.fontWeight] || "font-normal") : "";
    const overflowClass = overflow === TextOverflow.ellipsis ? "truncate" : overflow === TextOverflow.clip ? "overflow-hidden text-clip" : "";

    return (
        <span
            style={inlineStyle}
            className={cn("inline-block leading-normal", alignClass, weightClass, overflowClass)}
        >
            {renderedText}
        </span>
    );
}