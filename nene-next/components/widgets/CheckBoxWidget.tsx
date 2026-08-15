"use client";

import React, { useEffect } from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";
import { useDaikon } from "@/lib/context";
import { Checkbox } from "@/components/ui/checkbox";

export interface CheckBoxWidgetProps {
    id?: string;
    trailing?: WidgetNode;
    value?: boolean;
}

export default function CheckBoxWidget({
    id = "",
    trailing,
    value = false
}: CheckBoxWidgetProps) {
    const { getVariable, setVariable } = useDaikon();
    const controllerKey = `${id}.controller`;

    const currentVal = getVariable(controllerKey);
    const isChecked = currentVal !== undefined ? (typeof currentVal === "boolean" ? currentVal : currentVal === "true") : value;

    useEffect(() => {
        if (id && getVariable(controllerKey) === undefined) {
            setVariable(controllerKey, value);
        }
    }, [id, controllerKey, value, getVariable, setVariable]);

    const handleCheckedChange = (checked: boolean) => {
        if (id) {
            setVariable(controllerKey, checked);
        }
    };

    return (
        <label className="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <Checkbox
                checked={isChecked}
                onCheckedChange={(val) => handleCheckedChange(!!val)}
            />
            {trailing && trailing.name !== "Empty" && (
                <span className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    <Renderer node={trailing} />
                </span>
            )}
        </label>
    );
}
