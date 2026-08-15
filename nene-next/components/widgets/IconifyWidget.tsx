"use client";

import React, { useState, useEffect } from "react";
import * as LucideIcons from "lucide-react";

export interface IconifyWidgetProps {
    id?: string;
    icon: string;
    size?: number;
}

export default function IconifyWidget({ icon, size = 24 }: IconifyWidgetProps) {
    const [svgHtml, setSvgHtml] = useState<string | null>(null);

    // Format icon: e.g. "material-symbols/home" or "home"
    const cleanIcon = icon.includes("/") ? icon.replace("/", ":") : `material-symbols:${icon}`;

    useEffect(() => {
        let isMounted = true;
        fetch(`https://api.iconify.design/${cleanIcon}.svg`)
            .then((res) => (res.ok ? res.text() : Promise.reject(new Error("Failed to load icon"))))
            .then((text) => {
                if (isMounted) setSvgHtml(text);
            })
            .catch(() => {
                if (isMounted) setSvgHtml(null);
            });

        return () => {
            isMounted = false;
        };
    }, [cleanIcon]);

    if (svgHtml) {
        return (
            <span
                style={{ width: `${size}px`, height: `${size}px` }}
                className="inline-flex items-center justify-center shrink-0 [&_svg]:w-full [&_svg]:h-full [&_svg]:fill-current"
                dangerouslySetInnerHTML={{ __html: svgHtml }}
            />
        );
    }

    // Fallback: check Lucide icons
    const iconName = icon.split("/").pop() || icon;
    const pascalName = iconName
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("") as keyof typeof LucideIcons;

    const LucideComp = LucideIcons[pascalName] as React.ComponentType<{ size?: number; className?: string }> | undefined;
    if (LucideComp) {
        return <LucideComp size={size} className="inline-block shrink-0" />;
    }

    return (
        <span
            style={{ width: `${size}px`, height: `${size}px` }}
            className="inline-flex items-center justify-center rounded-sm bg-muted text-[10px] text-muted-foreground"
        >
            ●
        </span>
    );
}
