"use client";

import React from "react";
import Renderer from "../Daikon";
import { MainAxis, CrossAxis, type WidgetNode } from "@/lib/core";
import { cn } from "@/lib/utils";

export interface ColumnWidgetProps {
    id?: string;
    mainAxis?: MainAxis | string;
    crossAxis?: CrossAxis | string;
    foreach?: boolean;
    children?: WidgetNode[] | WidgetNode;
}

const mainAxisMap: Record<string, string> = {
    [MainAxis.start]: "justify-start",
    [MainAxis.center]: "justify-center",
    [MainAxis.end]: "justify-end",
    [MainAxis.spaceBetween]: "justify-between",
    [MainAxis.spaceAround]: "justify-around",
    [MainAxis.spaceEvenly]: "justify-evenly",
};

const crossAxisMap: Record<string, string> = {
    [CrossAxis.start]: "items-start",
    [CrossAxis.center]: "items-center",
    [CrossAxis.end]: "items-end",
    [CrossAxis.stretch]: "items-stretch",
};

export default function ColumnWidget({
    mainAxis = MainAxis.start,
    crossAxis = CrossAxis.start,
    children = []
}: ColumnWidgetProps) {
    const childrenList = Array.isArray(children) ? children : [children];
    const justifyClass = mainAxisMap[mainAxis] || "justify-start";
    const itemsClass = crossAxisMap[crossAxis] || "items-start";

    return (
        <div className={cn("flex flex-col w-full", justifyClass, itemsClass)}>
            {childrenList.map((child, idx) => (
                <Renderer key={child?.id || idx} node={child} />
            ))}
        </div>
    );
}
