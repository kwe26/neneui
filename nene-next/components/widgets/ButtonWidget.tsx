"use client";

import React from "react";
import Renderer from "../Daikon";
import { ButtonType, ButtonDensity, ButtonShape, type WidgetNode, type Action } from "@/lib/core";
import { useDaikon } from "@/lib/context";
import { cn } from "@/lib/utils";

export interface ButtonWidgetProps {
    id?: string;
    child?: WidgetNode;
    leading?: WidgetNode;
    type?: ButtonType | string;
    density?: ButtonDensity | string;
    shape?: ButtonShape | string;
    disabled?: boolean;
    onPressed?: {
        action: Action | string;
        data: any;
    };
}

const typeStyles: Record<string, string> = {
    [ButtonType.Normal]: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/40",
    [ButtonType.Primary]: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-xs",
    [ButtonType.Secondary]: "bg-muted text-foreground hover:bg-muted/80 border border-border/50",
    [ButtonType.Success]: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-xs",
    [ButtonType.Danger]: "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-xs",
    [ButtonType.Info]: "bg-blue-600 text-white hover:bg-blue-700 shadow-xs",
    [ButtonType.Warning]: "bg-amber-500 text-white hover:bg-amber-600 shadow-xs",
};

const densityStyles: Record<string, string> = {
    [ButtonDensity.compact]: "h-7 px-2 text-xs gap-1",
    [ButtonDensity.dense]: "h-8 px-3 text-xs gap-1.5",
    [ButtonDensity.normal]: "h-9 px-4 text-sm gap-2",
    [ButtonDensity.comfortable]: "h-10 px-5 text-sm gap-2.5",
    [ButtonDensity.icon]: "h-9 w-9 p-0 justify-center",
};

export default function ButtonWidget({
    child,
    leading,
    type = ButtonType.Normal,
    density = ButtonDensity.normal,
    shape = ButtonShape.rectangle,
    disabled = false,
    onPressed
}: ButtonWidgetProps) {
    const { performAction } = useDaikon();

    const handleClick = () => {
        if (disabled || !onPressed) return;
        performAction(onPressed.action, onPressed.data);
    };

    const typeClass = typeStyles[type] || typeStyles[ButtonType.Normal];
    const densityClass = densityStyles[density] || densityStyles[ButtonDensity.normal];
    const shapeClass = shape === ButtonShape.circle ? "rounded-full aspect-square p-0" : "rounded-lg";

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={handleClick}
            className={cn(
                "inline-flex items-center justify-center font-medium transition-all duration-150 cursor-pointer select-none active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed",
                typeClass,
                densityClass,
                shapeClass
            )}
        >
            {leading && leading.name !== "Empty" && (
                <span className="flex items-center shrink-0">
                    <Renderer node={leading} />
                </span>
            )}
            {child && child.name !== "Empty" && <Renderer node={child} />}
        </button>
    );
}
