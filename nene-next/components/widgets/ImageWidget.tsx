"use client";

import React, { useState } from "react";
import Renderer from "../Daikon";
import { BoxFit, Alignment, ImageRepeat, type WidgetNode } from "@/lib/core";
import { useDaikon } from "@/lib/context";
import { cn } from "@/lib/utils";

export interface ImageWidgetProps {
    id?: string;
    path: string;
    width?: number;
    height?: number;
    scale?: number;
    color?: string;
    repeat?: ImageRepeat;
    fit?: BoxFit | string;
    alignment?: Alignment | string;
    filterQuality?: string;
    loadingWidget?: WidgetNode;
    errorWidget?: WidgetNode;
}

const objectFitMap: Record<string, string> = {
    [BoxFit.fill]: "object-fill",
    [BoxFit.contain]: "object-contain",
    [BoxFit.cover]: "object-cover",
    [BoxFit.none]: "object-none",
    [BoxFit.fitWidth]: "w-full object-contain",
    [BoxFit.fitHeight]: "h-full object-contain",
};

export default function ImageWidget({
    path = "",
    width,
    height,
    scale = 1,
    fit = BoxFit.contain,
    loadingWidget,
    errorWidget
}: ImageWidgetProps) {
    const { parseVariable, getVariable } = useDaikon();
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const resolvedPath = parseVariable(path);

    let src = resolvedPath;
    if (resolvedPath.startsWith("web+")) {
        src = resolvedPath.replace("web+", "");
    } else if (resolvedPath.startsWith("local+")) {
        src = resolvedPath.replace("local+", "");
    } else if (resolvedPath.startsWith("memory+")) {
        const memKey = resolvedPath.replace("memory+", "");
        const memVal = getVariable(`${memKey}.file`);
        src = memVal ? (typeof memVal === "string" ? memVal : URL.createObjectURL(new Blob([memVal]))) : "";
    }

    if (hasError) {
        if (errorWidget && errorWidget.name !== "Empty") {
            return <Renderer node={errorWidget} />;
        }
        return (
            <div
                style={{ width: width ? `${width}px` : "auto", height: height ? `${height}px` : "auto" }}
                className="flex items-center justify-center bg-muted text-muted-foreground text-xs p-2 rounded-md"
            >
                Image unavailable
            </div>
        );
    }

    const fitClass = objectFitMap[fit] || "object-contain";

    return (
        <div
            style={{
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined,
                transform: scale !== 1 ? `scale(${scale})` : undefined
            }}
            className="relative inline-flex items-center justify-center overflow-hidden"
        >
            {isLoading && loadingWidget && loadingWidget.name !== "Empty" && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                    <Renderer node={loadingWidget} />
                </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={src}
                alt="NeneUI Image"
                style={{
                    width: width ? `${width}px` : "100%",
                    height: height ? `${height}px` : "auto"
                }}
                className={cn("transition-opacity duration-200", fitClass, isLoading ? "opacity-0" : "opacity-100")}
                onLoad={() => setIsLoading(false)}
                onError={() => {
                    setIsLoading(false);
                    setHasError(true);
                }}
            />
        </div>
    );
}
