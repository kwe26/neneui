"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface ExpandedWidgetProps {
    id?: string;
    child?: WidgetNode;
    flex?: number;
}

export default function ExpandedWidget({ child, flex = 1 }: ExpandedWidgetProps) {
    if (!child || child.name === "Empty") return null;

    return (
        <div style={{ flex: `${flex} ${flex} 0%`, minWidth: 0, minHeight: 0 }} className="w-full">
            <Renderer node={child} />
        </div>
    );
}
