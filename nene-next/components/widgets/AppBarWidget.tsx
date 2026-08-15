"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface AppBarWidgetProps {
    id?: string;
    leading?: WidgetNode;
    title?: WidgetNode;
    actions?: WidgetNode[];
    backgroundColor?: string;
}

export default function AppBarWidget({
    leading,
    title,
    actions = [],
    backgroundColor = "#ffffff"
}: AppBarWidgetProps) {
    return (
        <header
            className="w-full border-b px-4 py-3 flex items-center justify-between shadow-xs sticky top-0 z-40 transition-colors"
            style={{ backgroundColor }}
        >
            <div className="flex items-center gap-3">
                {leading && leading.name !== "Empty" && (
                    <div className="flex items-center">
                        <Renderer node={leading} />
                    </div>
                )}
                {title && (
                    <div className="font-semibold text-lg tracking-tight">
                        <Renderer node={title} />
                    </div>
                )}
            </div>

            {actions && actions.length > 0 && (
                <div className="flex items-center gap-2">
                    {actions.map((act, idx) => (
                        <Renderer key={act.id || idx} node={act} />
                    ))}
                </div>
            )}
        </header>
    );
}
