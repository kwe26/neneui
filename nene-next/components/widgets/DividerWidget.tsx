"use client";

import React from "react";
import { Separator } from "@/components/ui/separator";

export function DividerWidget() {
    return <Separator orientation="horizontal" className="my-2" />;
}

export function VerticalDividerWidget() {
    return <Separator orientation="vertical" className="mx-2 h-full min-h-6" />;
}
