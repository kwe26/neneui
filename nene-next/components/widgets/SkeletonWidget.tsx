"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface SkeletonWidgetProps {
    id?: string;
    child?: WidgetNode;
}

export default function SkeletonWidget({ child }: SkeletonWidgetProps) {
    return (
        <div className="animate-pulse bg-muted/60 rounded-xl overflow-hidden pointer-events-none select-none">
            {child && child.name !== "Empty" && (
                <div className="opacity-40">
                    <Renderer node={child} />
                </div>
            )}
        </div>
    );
}
