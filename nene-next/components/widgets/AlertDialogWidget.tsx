"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";
import { useDaikon } from "@/lib/context";
import { X } from "lucide-react";

export interface AlertDialogWidgetProps {
    id?: string;
    leading?: WidgetNode;
    title?: WidgetNode;
    content?: WidgetNode;
    actions?: WidgetNode[];
    barrierDismissible?: boolean;
}

export default function AlertDialogWidget({
    leading,
    title,
    content,
    actions = []
}: AlertDialogWidgetProps) {
    const { closeDialog } = useDaikon();

    return (
        <div className="bg-card text-card-foreground p-6 rounded-2xl shadow-2xl border border-border max-w-md w-full animate-in fade-in-0 zoom-in-95 duration-200">
            <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    {leading && leading.name !== "Empty" && (
                        <div className="shrink-0">
                            <Renderer node={leading} />
                        </div>
                    )}
                    {title && title.name !== "Empty" && (
                        <div className="text-lg font-semibold tracking-tight">
                            <Renderer node={title} />
                        </div>
                    )}
                </div>
                <button
                    type="button"
                    onClick={closeDialog}
                    className="text-muted-foreground hover:text-foreground rounded-lg p-1 transition-colors cursor-pointer"
                >
                    <X size={18} />
                </button>
            </div>

            {content && content.name !== "Empty" && (
                <div className="text-sm text-muted-foreground mb-6">
                    <Renderer node={content} />
                </div>
            )}

            {actions && actions.length > 0 && (
                <div className="flex items-center justify-end gap-2 mt-4">
                    {actions.map((act, idx) => (
                        <Renderer key={act.id || idx} node={act} />
                    ))}
                </div>
            )}
        </div>
    );
}
