"use client";

import React, { useState } from "react";
import Renderer from "../Daikon";
import { NavigationBarAlignment, NavigationLabelType, type WidgetNode } from "@/lib/core";
import { cn } from "@/lib/utils";

export interface NavigationItemWidgetProps {
    id?: string;
    key?: number | string;
    label?: string;
    child?: WidgetNode;
    selected?: boolean;
    labelType?: NavigationLabelType | string;
    onClick?: () => void;
}

export function NavigationItemWidget({
    label = "",
    child,
    selected = false,
    labelType = NavigationLabelType.none,
    onClick
}: NavigationItemWidgetProps) {
    const showLabel = labelType === NavigationLabelType.all || (labelType === NavigationLabelType.selected && selected);

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex flex-col items-center justify-center gap-1 py-2 px-3 rounded-xl transition-all cursor-pointer select-none text-xs font-medium",
                selected
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
        >
            {child && child.name !== "Empty" && (
                <div className="flex items-center justify-center">
                    <Renderer node={child} />
                </div>
            )}
            {showLabel && label && <span>{label}</span>}
        </button>
    );
}

export interface NavigationBarWidgetProps {
    id?: string;
    alignment?: NavigationBarAlignment | string;
    labelType?: NavigationLabelType | string;
    expanded?: boolean;
    selectedKey?: string | number;
    children?: WidgetNode[];
}

const alignMap: Record<string, string> = {
    [NavigationBarAlignment.start]: "justify-start",
    [NavigationBarAlignment.center]: "justify-center",
    [NavigationBarAlignment.end]: "justify-end",
    [NavigationBarAlignment.spaceBetween]: "justify-between",
    [NavigationBarAlignment.spaceAround]: "justify-around",
    [NavigationBarAlignment.spaceEvenly]: "justify-evenly",
};

export default function NavigationBarWidget({
    alignment = NavigationBarAlignment.center,
    labelType = NavigationLabelType.none,
    expanded = false,
    selectedKey = 0,
    children = []
}: NavigationBarWidgetProps) {
    const [activeKey, setActiveKey] = useState<string | number>(selectedKey);
    const alignClass = alignMap[alignment] || "justify-center";

    return (
        <nav
            className={cn(
                "w-full border-t bg-background/95 backdrop-blur-md px-4 py-2 flex items-center shadow-md",
                alignClass,
                expanded ? "justify-around" : ""
            )}
        >
            <div className={cn("flex items-center gap-2", expanded ? "w-full justify-around" : "")}>
                {children.map((item, idx) => {
                    const itemKey = item.props?.key ?? idx;
                    const isSelected = String(activeKey) === String(itemKey);
                    return (
                        <NavigationItemWidget
                            key={item.id || idx}
                            {...item.props}
                            selected={isSelected}
                            labelType={labelType}
                            onClick={() => setActiveKey(itemKey)}
                        />
                    );
                })}
            </div>
        </nav>
    );
}
