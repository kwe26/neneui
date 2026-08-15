"use client";

import React, { useEffect, useRef } from "react";
import Renderer from "../Daikon";
import { type WidgetNode, type Action } from "@/lib/core";
import { useDaikon } from "@/lib/context";

export interface ScaffoldWidgetProps {
    id?: string;
    appBar?: WidgetNode;
    body?: WidgetNode;
    drawer?: WidgetNode;
    preActions?: Array<{ action: Action | string; data: any }>;
    floatingActionButton?: WidgetNode;
    bottom?: WidgetNode;
    backgroundColor?: string;
    floatingActionButtonLocation?: any;
}

export default function ScaffoldWidget({
    appBar,
    body,
    drawer,
    preActions = [],
    floatingActionButton,
    bottom,
    backgroundColor
}: ScaffoldWidgetProps) {
    const { performAction } = useDaikon();
    const hasRunPreActions = useRef(false);

    useEffect(() => {
        if (!hasRunPreActions.current && preActions && preActions.length > 0) {
            hasRunPreActions.current = true;
            for (const act of preActions) {
                performAction(act.action, act.data);
            }
        }
    }, [preActions, performAction]);

    const bgStyle: React.CSSProperties = {};
    if (backgroundColor && backgroundColor !== "#00000" && backgroundColor !== "#000000") {
        bgStyle.backgroundColor = backgroundColor;
    }

    return (
        <div style={bgStyle} className="min-h-screen flex flex-col bg-background text-foreground relative">
            {drawer && drawer.name !== "Empty" && (
                <div className="fixed inset-y-0 left-0 z-50">
                    <Renderer node={drawer} />
                </div>
            )}

            {appBar && appBar.name !== "Empty" && <Renderer node={appBar} />}

            <main className="flex-1 flex flex-col w-full overflow-auto">
                {body && body.name !== "Empty" && <Renderer node={body} />}
            </main>

            {bottom && bottom.name !== "Empty" && (
                <div className="sticky bottom-0 z-40">
                    <Renderer node={bottom} />
                </div>
            )}

            {floatingActionButton && floatingActionButton.name !== "Empty" && (
                <div className="fixed bottom-6 right-6 z-50">
                    <Renderer node={floatingActionButton} />
                </div>
            )}
        </div>
    );
}