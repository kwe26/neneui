"use client";

import React from "react";

export interface ProgressWidgetProps {
    id?: string;
    progress?: number;
    color?: string;
    backgroundColor?: string;
}

export function ProgressWidget({
    progress = 0,
    color = "#3b82f6",
    backgroundColor = "#e2e8f0"
}: ProgressWidgetProps) {
    const percentage = Math.min(100, Math.max(0, progress > 1 ? progress : progress * 100));

    return (
        <div
            style={{ backgroundColor }}
            className="w-full h-2.5 rounded-full overflow-hidden relative"
        >
            <div
                style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                }}
                className="h-full rounded-full transition-all duration-300 ease-out"
            />
        </div>
    );
}

export interface CircularProgressIndicatorWidgetProps {
    id?: string;
    color?: string;
    strokeWidth?: number;
    size?: number;
    value?: number;
}

export function CircularProgressIndicatorWidget({
    color = "#0F0F0F",
    strokeWidth = 3,
    size = 28,
    value
}: CircularProgressIndicatorWidgetProps) {
    const radius = 12;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = value !== undefined ? circumference - (value * circumference) : undefined;

    return (
        <div
            style={{ width: `${size}px`, height: `${size}px` }}
            className="inline-flex items-center justify-center"
        >
            <svg
                className={value === undefined ? "animate-spin" : ""}
                viewBox="0 0 32 32"
                style={{ width: `${size}px`, height: `${size}px` }}
            >
                <circle
                    className="opacity-20"
                    cx="16"
                    cy="16"
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                />
                <circle
                    className="transition-all duration-200"
                    cx="16"
                    cy="16"
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset ?? circumference * 0.7}
                    fill="none"
                />
            </svg>
        </div>
    );
}

export interface LinearProgressIndicatorWidgetProps {
    id?: string;
    color?: string;
    minHeight?: number;
}

export function LinearProgressIndicatorWidget({
    color = "#000000",
    minHeight = 3
}: LinearProgressIndicatorWidgetProps) {
    return (
        <div
            style={{ height: `${minHeight}px` }}
            className="w-full bg-muted overflow-hidden relative rounded-full"
        >
            <div
                style={{ backgroundColor: color }}
                className="w-full h-full origin-left animate-pulse"
            />
        </div>
    );
}
