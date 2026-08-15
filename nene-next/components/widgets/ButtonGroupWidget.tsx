"use client";

import React from "react";
import Renderer from "../Daikon";
import { Direction, type WidgetNode } from "@/lib/core";
import { cn } from "@/lib/utils";

export interface ButtonGroupWidgetProps {
    id?: string;
    children?: WidgetNode[];
    direction?: Direction | string;
}

export default function ButtonGroupWidget({
    children = [],
    direction = Direction.Horizontal
}: ButtonGroupWidgetProps) {
    const isHorizontal = direction === Direction.Horizontal || direction === "horizontal";

    return (
        <div
            className={cn(
                "inline-flex flex-wrap gap-1 items-center p-1 rounded-xl bg-muted/40 border border-border/50 shadow-2xs",
                isHorizontal ? "flex-row" : "flex-col"
            )}
        >
            {children.map((child, idx) => (
                <Renderer key={child?.id || idx} node={child} />
            ))}
        </div>
    );
}
