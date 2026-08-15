"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface PaddingWidgetProps {
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
    };
}

export default function PaddingWidget({
    child,
    padding = { l: 0, r: 0, t: 0, b: 0 }
}: PaddingWidgetProps) {
    const left = padding.l ?? padding.left ?? 0;
    const right = padding.r ?? padding.right ?? 0;
    const top = padding.t ?? padding.top ?? 0;
    const bottom = padding.b ?? padding.bottom ?? 0;

    const style: React.CSSProperties = {
        paddingLeft: `${left}px`,
        paddingRight: `${right}px`,
        paddingTop: `${top}px`,
        paddingBottom: `${bottom}px`
    };

    return (
        <div style={style} className="w-full">
            {child && child.name !== "Empty" && <Renderer node={child} />}
        </div>
    );
}
