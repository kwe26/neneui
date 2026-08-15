"use client";

import React, { useState } from "react";
import Renderer from "../Daikon";
import { NavigationLabelType, NavigationLabelPosition, Alignment, type WidgetNode } from "@/lib/core";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export function NavigationDividerWidget() {
    return <Separator orientation="horizontal" className="my-2" />;
}

export interface NavigationGroupWidgetProps {
    id?: string;
    label?: string;
    children?: WidgetNode[];
    labelAlignment?: Alignment | string;
}

export function NavigationGroupWidget({
    label = "Group",
    children = []
}: NavigationGroupWidgetProps) {
    return (
        <div className="flex flex-col gap-1 w-full my-2">
            {label && (
                <span className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase px-3 py-1">
                    {label}
                </span>
            )}
            <div className="flex flex-col gap-0.5">
                {children.map((child, idx) => (
                    <Renderer key={child?.id || idx} node={child} />
                ))}
            </div>
        </div>
    );
}

export interface NavigationRailWidgetProps {
    id?: string;
    alignment?: Alignment | string;
    labelType?: NavigationLabelType | string;
    labelPosition?: NavigationLabelPosition | string;
    header?: WidgetNode[];
    footer?: WidgetNode[];
    expanded?: boolean;
    children?: WidgetNode[];
}

export default function NavigationRailWidget({
    labelType = NavigationLabelType.none,
    header = [],
    footer = [],
    expanded = false,
    children = []
}: NavigationRailWidgetProps) {
    const [selectedIdx, setSelectedIdx] = useState(0);

    return (
        <aside
            className={cn(
                "h-full min-h-screen border-r bg-card text-card-foreground flex flex-col justify-between py-4 transition-all duration-200 shadow-xs",
                expanded ? "w-60 px-3" : "w-16 px-1.5"
            )}
        >
            <div className="flex flex-col items-center gap-4 w-full">
                {header && header.length > 0 && (
                    <div className="flex flex-col items-center gap-2 w-full mb-2">
                        {header.map((h, idx) => (
                            <Renderer key={h?.id || idx} node={h} />
                        ))}
                    </div>
                )}

                <div className="flex flex-col items-center gap-1.5 w-full">
                    {children.map((item, idx) => {
                        const isSelected = selectedIdx === idx;
                        const label = item.props?.label || "";
                        const showLabel = expanded || labelType === NavigationLabelType.all || (labelType === NavigationLabelType.selected && isSelected);

                        return (
                            <button
                                key={item.id || idx}
                                type="button"
                                onClick={() => setSelectedIdx(idx)}
                                className={cn(
                                    "flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer select-none text-sm font-medium w-full",
                                    expanded ? "justify-start px-3" : "justify-center",
                                    isSelected
                                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                                title={!expanded ? label : undefined}
                            >
                                {item.props?.child ? (
                                    <span className="flex items-center justify-center shrink-0">
                                        <Renderer node={item.props.child} />
                                    </span>
                                ) : (
                                    <Renderer node={item} />
                                )}
                                {showLabel && label && <span className="truncate">{label}</span>}
                            </button>
                        );
                    })}
                </div>
            </div>

            {footer && footer.length > 0 && (
                <div className="flex flex-col items-center gap-2 w-full mt-auto pt-4 border-t">
                    {footer.map((f, idx) => (
                        <Renderer key={f?.id || idx} node={f} />
                    ))}
                </div>
            )}
        </aside>
    );
}
