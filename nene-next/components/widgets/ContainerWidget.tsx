"use client";

import React from "react";
import Renderer from "../Daikon";
import { type WidgetNode, type BoxDecorationProps } from "@/lib/core";

export interface ContainerWidgetProps {
    id?: string;
    child?: WidgetNode;
    decoration?: BoxDecorationProps;
}

export default function ContainerWidget({ child, decoration }: ContainerWidgetProps) {
    const style: React.CSSProperties = {};

    if (decoration) {
        if (decoration.color && decoration.color !== "none") {
            style.backgroundColor = decoration.color;
        }
        if (decoration.radius) {
            style.borderRadius = `${decoration.radius}px`;
        }
        if (decoration.borderColor && decoration.borderWidth) {
            style.border = `${decoration.borderWidth}px solid ${decoration.borderColor}`;
        }
        if (decoration.image && decoration.image !== "none") {
            style.backgroundImage = `url(${decoration.image})`;
            style.backgroundSize = "cover";
            style.backgroundPosition = "center";
        }
    }

    return (
        <div style={style}>
            {child && child.name !== "Empty" && <Renderer node={child} />}
        </div>
    );
}
