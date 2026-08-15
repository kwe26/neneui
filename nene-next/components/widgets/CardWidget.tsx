"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";
import { Card as UICard } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export interface CardWidgetProps {
    id?: string;
    child?: WidgetNode;
    padding?: {
        l?: number;
        r?: number;
        t?: number;
        b?: number;
        left?: number;
        right?: number;
        top?: number;
        bottom?: number;
    } | number;
    color?: string;
    type?: "filled" | "outlined" | "normal";
}

export default function CardWidget({
    child,
    padding,
    color,
    type = "normal"
}: CardWidgetProps) {
    let paddingStyle: React.CSSProperties = {};
    if (typeof padding === "number") {
        paddingStyle = { padding: `${padding * 4}px` };
    } else if (padding && typeof padding === "object") {
        const l = padding.l ?? padding.left ?? 0;
        const r = padding.r ?? padding.right ?? 0;
        const t = padding.t ?? padding.top ?? 0;
        const b = padding.b ?? padding.bottom ?? 0;
        paddingStyle = {
            paddingLeft: `${l}px`,
            paddingRight: `${r}px`,
            paddingTop: `${t}px`,
            paddingBottom: `${b}px`
        };
    }

    const inlineStyle: React.CSSProperties = {
        ...paddingStyle,
        backgroundColor: color || undefined
    };

    const variantClass =
        type === "filled"
            ? "bg-secondary text-secondary-foreground shadow-xs border-0"
            : type === "outlined"
            ? "border border-border bg-transparent shadow-none"
            : "bg-card text-card-foreground border border-border shadow-xs";

    return (
        <UICard style={inlineStyle} className={cn("rounded-xl transition-all", variantClass)}>
            {child && child.name !== "Empty" && <Renderer node={child} />}
        </UICard>
    );
}
