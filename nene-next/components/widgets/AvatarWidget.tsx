"use client";

import React, { useState } from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";
import { useDaikon } from "@/lib/context";

export interface AvatarBadgeWidgetProps {
    id?: string;
    size?: number;
    child?: WidgetNode;
    color?: string;
}

export function AvatarBadgeWidget({
    size = 12,
    child,
    color = "#329e00"
}: AvatarBadgeWidgetProps) {
    return (
        <span
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: color
            }}
            className="absolute bottom-0 right-0 rounded-full ring-2 ring-background flex items-center justify-center overflow-hidden z-10"
        >
            {child && child.name !== "Empty" && <Renderer node={child} />}
        </span>
    );
}

export interface AvatarWidgetProps {
    id?: string;
    backgroundColor?: string;
    initials?: string;
    size?: number;
    badge?: WidgetNode;
    image?: string;
}

export default function AvatarWidget({
    backgroundColor = "#000000",
    initials = "Avatar",
    size = 32,
    badge,
    image
}: AvatarWidgetProps) {
    const { parseVariable } = useDaikon();
    const [imgFailed, setImgFailed] = useState(false);

    let src = image ? parseVariable(image) : "";
    if (src.startsWith("web+")) {
        src = src.replace("web+", "");
    } else if (src.startsWith("local+")) {
        src = src.replace("local+", "");
    }

    const initialsLetters = initials
        .split(" ")
        .map((n) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase();

    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`
            }}
            className="relative inline-flex shrink-0"
        >
            <div
                style={{
                    backgroundColor: backgroundColor || "#6366f1"
                }}
                className="w-full h-full rounded-full overflow-hidden flex items-center justify-center text-white font-medium text-xs shadow-xs"
            >
                {src && !imgFailed ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={src}
                        alt={initials}
                        className="w-full h-full object-cover"
                        onError={() => setImgFailed(true)}
                    />
                ) : (
                    <span style={{ fontSize: `${Math.max(10, size * 0.38)}px` }}>{initialsLetters}</span>
                )}
            </div>

            {badge && badge.name !== "Empty" && <Renderer node={badge} />}
        </div>
    );
}
