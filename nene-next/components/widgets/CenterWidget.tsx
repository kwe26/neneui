"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";

export interface CenterWidgetProps {
    child?: WidgetNode;
}

export default function CenterWidget({ child }: CenterWidgetProps) {
    if (!child || child.name === "Empty") return null;

    return (
        <div className="flex items-center justify-center w-full">
            <Renderer node={child} />
        </div>
    );
}
