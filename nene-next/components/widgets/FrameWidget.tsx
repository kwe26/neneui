"use client";

import React, { useState, useEffect } from "react";
import Renderer from "../Daikon";
import { type WidgetNode } from "@/lib/core";
import { CircularProgressIndicatorWidget } from "./ProgressWidget";

export interface FrameWidgetProps {
    id?: string;
    framePath?: string;
}

export default function FrameWidget({ framePath = "/ui/main" }: FrameWidgetProps) {
    const [node, setNode] = useState<WidgetNode | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;
        setLoading(true);
        const url = framePath.startsWith("http") ? framePath : `http://localhost:3500${framePath}`;

        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
                return res.json();
            })
            .then((data) => {
                if (isMounted) {
                    setNode(data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err.message);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [framePath]);

    if (loading) {
        return (
            <div className="flex items-center justify-center p-8 w-full">
                <CircularProgressIndicatorWidget />
            </div>
        );
    }

    if (error || !node) {
        return (
            <div className="p-4 text-xs text-destructive bg-destructive/10 rounded-lg">
                Failed to load frame: {error}
            </div>
        );
    }

    return <Renderer node={node} />;
}
