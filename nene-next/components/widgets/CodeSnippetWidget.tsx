"use client";

import React, { useState } from "react";
import Renderer from "../Daikon";
import { type WidgetNode, type BoxConstraintsProps } from "@/lib/core";
import { Copy, Check } from "lucide-react";
import { useDaikon } from "@/lib/context";

export interface CodeSnippetWidgetProps {
    id?: string;
    code?: string;
    lang?: string;
    constraints?: {
        name?: string;
        props?: BoxConstraintsProps;
    } | BoxConstraintsProps;
    actions?: WidgetNode[];
}

export default function CodeSnippetWidget({
    code = "",
    lang = "dart",
    constraints,
    actions = []
}: CodeSnippetWidgetProps) {
    const { performAction } = useDaikon();
    const [copied, setCopied] = useState(false);

    const rawProps = constraints && typeof constraints === "object" && "props" in constraints && constraints.props
        ? constraints.props
        : (constraints as BoxConstraintsProps | undefined);
    const cProps = rawProps;
    const minWidth = cProps?.minWidth && cProps.minWidth !== Infinity ? cProps.minWidth : undefined;
    const maxWidth = cProps?.maxWidth && cProps.maxWidth !== Infinity ? cProps.maxWidth : undefined;
    const minHeight = cProps?.minHeight && cProps.minHeight !== Infinity ? cProps.minHeight : undefined;
    const maxHeight = cProps?.maxHeight && cProps.maxHeight !== Infinity ? cProps.maxHeight : 500;

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div
            style={{
                minWidth: minWidth ? `${minWidth}px` : undefined,
                maxWidth: maxWidth ? `${maxWidth}px` : undefined,
                minHeight: minHeight ? `${minHeight}px` : undefined
            }}
            className="w-full rounded-xl border border-border/80 bg-zinc-950 text-zinc-100 shadow-md overflow-hidden my-2 text-sm font-mono"
        >
            <div className="flex items-center justify-between px-4 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
                <span className="uppercase font-semibold tracking-wider text-zinc-300">{lang}</span>
                <div className="flex items-center gap-1.5">
                    <button
                        type="button"
                        onClick={handleCopy}
                        className="p-1.5 rounded-md hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors flex items-center gap-1 text-xs cursor-pointer"
                        title="Copy code"
                    >
                        {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                        <span>{copied ? "Copied" : "Copy"}</span>
                    </button>

                    {actions && actions.length > 0 && actions.map((act, idx) => (
                        <Renderer key={act.id || idx} node={act} />
                    ))}
                </div>
            </div>

            <div
                style={{
                    maxHeight: maxHeight ? `${maxHeight}px` : undefined
                }}
                className="overflow-auto p-4 text-xs leading-relaxed"
            >
                <pre className="whitespace-pre">
                    <code>{code}</code>
                </pre>
            </div>
        </div>
    );
}
