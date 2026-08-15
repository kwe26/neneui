"use client";

import React, { useState } from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface HoverCardWidgetProps {
    id?: string;
    child?: WidgetNode;
    hoverCard?: WidgetNode;
}

export default function HoverCardWidget({ child, hoverCard }: HoverCardWidgetProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {child && child.name !== "Empty" && <Renderer node={child} />}

            {isHovered && hoverCard && hoverCard.name !== "Empty" && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 p-3 bg-popover text-popover-foreground rounded-xl shadow-xl border border-border min-w-48 animate-in fade-in-0 zoom-in-95 duration-150">
                    <Renderer node={hoverCard} />
                </div>
            )}
        </div>
    );
}
