"use client";

import React, { useEffect } from "react";
import Renderer from "../Daikon";
import { InputType, type WidgetNode } from "@/lib/core";
import { useDaikon } from "@/lib/context";
import { Input } from "@/components/ui/input";

export interface TextFieldWidgetProps {
    id?: string;
    controller?: {
        name: string;
        props?: { value?: string };
    };
    placeholder?: WidgetNode;
    inputType?: InputType | string;
    features?: WidgetNode[];
}

export default function TextFieldWidget({
    id = "",
    controller,
    placeholder,
    inputType = InputType.text,
    features = []
}: TextFieldWidgetProps) {
    const { getVariable, setVariable, parseVariable } = useDaikon();
    const controllerKey = `${id}.controller`;

    const initialVal = controller?.props?.value ?? "";
    const currentValue = getVariable(controllerKey);

    useEffect(() => {
        if (id && getVariable(controllerKey) === undefined) {
            setVariable(controllerKey, initialVal);
        }
    }, [id, controllerKey, initialVal, getVariable, setVariable]);

    const placeholderText = placeholder ? parseVariable(placeholder.props?.text ?? "") : "Enter text...";

    const typeAttr =
        inputType === InputType.password
            ? "password"
            : inputType === InputType.number
            ? "number"
            : inputType === InputType.phone
            ? "tel"
            : "text";

    return (
        <div className="flex flex-col gap-1.5 w-full">
            <div className="relative flex items-center w-full">
                <Input
                    type={typeAttr}
                    placeholder={placeholderText}
                    value={currentValue !== undefined ? currentValue : initialVal}
                    onChange={(e) => {
                        if (id) {
                            setVariable(controllerKey, e.target.value);
                        }
                    }}
                    className="w-full h-9 rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-2xs transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
            </div>

            {features && features.length > 0 && (
                <div className="flex items-center gap-2">
                    {features.map((feat, idx) => (
                        <Renderer key={feat.id || idx} node={feat} />
                    ))}
                </div>
            )}
        </div>
    );
}
