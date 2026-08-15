"use client";

import React from "react";
import Renderer from "../Daikon";
import { BreadcrumbSeparator, type WidgetNode } from "@/lib/core";
import { ChevronRight, Slash, MoreHorizontal } from "lucide-react";

export function MoreDotsWidget() {
    return (
        <span className="inline-flex items-center justify-center text-muted-foreground">
            <MoreHorizontal size={16} />
        </span>
    );
}

export interface BreadcrumbWidgetProps {
    id?: string;
    separator?: BreadcrumbSeparator | string;
    children?: WidgetNode[];
}

export default function BreadcrumbWidget({
    separator = BreadcrumbSeparator.arrowSeparator,
    children = []
}: BreadcrumbWidgetProps) {
    const isSlash = separator === BreadcrumbSeparator.slashSeparator || separator === "slashSeparator";

    return (
        <nav aria-label="breadcrumb" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground flex-wrap">
            {children.map((child, idx) => (
                <React.Fragment key={child?.id || idx}>
                    <div className="inline-flex items-center hover:text-foreground transition-colors font-medium">
                        <Renderer node={child} />
                    </div>
                    {idx < children.length - 1 && (
                        <span className="text-muted-foreground/60 select-none flex items-center">
                            {isSlash ? <Slash size={14} /> : <ChevronRight size={14} />}
                        </span>
                    )}
                </React.Fragment>
            ))}
        </nav>
    );
}
