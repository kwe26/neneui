"use client";

import React from "react";
import Renderer from "../Daikon";
import { MainAxis, CrossAxis, Direction, TextDirection, type WidgetNode } from "@/lib/core";
import { cn } from "@/lib/utils";

export interface FlexWidgetProps {
    id?: string;
    children?: WidgetNode[];
    direction?: Direction | string;
    mainAxis?: MainAxis | string;
    crossAxis?: CrossAxis | string;
    spacing?: number;
    textDirection?: TextDirection | string;
    foreach?: boolean;
}

const mainAxisMap: Record<string, string> = {
    [MainAxis.start]: "justify-start",
    [MainAxis.center]: "justify-center",
    [MainAxis.end]: "justify-end",
    [MainAxis.spaceBetween]: "justify-between",
    [MainAxis.spaceAround]: "justify-around",
    [MainAxis.spaceEvenly]: "justify-evenly",
};

const crossAxisMap: Record<string, string> = {
    [CrossAxis.start]: "items-start",
    [CrossAxis.center]: "items-center",
    [CrossAxis.end]: "items-end",
    [CrossAxis.stretch]: "items-stretch",
};

export default function FlexWidget({
    children = [],
    direction = Direction.Vertical,
    mainAxis = MainAxis.start,
    crossAxis = CrossAxis.start,
    spacing = 0,
    textDirection = TextDirection.ltr
}: FlexWidgetProps) {
    const isHorizontal = direction === Direction.Horizontal || direction === "horizontal";
    const justifyClass = mainAxisMap[mainAxis] || "justify-start";
    const itemsClass = crossAxisMap[crossAxis] || "items-start";

    return (
        <div
            dir={textDirection === TextDirection.rtl ? "rtl" : "ltr"}
            style={{ gap: spacing > 0 ? `${spacing}px` : undefined }}
            className={cn(
                "flex w-full",
                isHorizontal ? "flex-row" : "flex-col",
                justifyClass,
                itemsClass
            )}
        >
            {children.map((child, idx) => (
                <Renderer key={child?.id || idx} node={child} />
            ))}
        </div>
    );
}
