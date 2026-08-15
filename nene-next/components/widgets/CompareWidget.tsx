"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";
import { useDaikon } from "@/lib/context";

export interface CompareWidgetProps {
    id?: string;
    fi?: string;
    ifEqualTo?: string;
    then?: WidgetNode;
    or?: WidgetNode;
}

export default function CompareWidget({
    fi = "noIf",
    ifEqualTo = "noIf",
    then,
    or
}: CompareWidgetProps) {
    const { getVariable } = useDaikon();

    const actualVal = getVariable(fi);
    const actualStr = actualVal !== undefined ? String(actualVal) : "";

    const conditionMatched = actualStr === String(ifEqualTo);

    if (conditionMatched) {
        return then && then.name !== "Empty" ? <Renderer node={then} /> : null;
    } else {
        return or && or.name !== "Empty" ? <Renderer node={or} /> : null;
    }
}
