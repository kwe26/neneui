"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface SizedBoxWidgetProps {
    id?: string;
    child?: WidgetNode;
    width?: number;
    height?: number;
}

export default function SizedBoxWidget({
    child,
    width = 1,
    height = 1
}: SizedBoxWidgetProps) {
    const style: React.CSSProperties = {
        width: width !== undefined ? `${width}px` : undefined,
        height: height !== undefined ? `${height}px` : undefined,
        flexShrink: 0
    };

    return (
        <div style={style} className="inline-block">
            {child && child.name !== "Empty" && <Renderer node={child} />}
        </div>
    );
}
