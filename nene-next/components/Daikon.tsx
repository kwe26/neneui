"use client";

import React, { useEffect } from "react";
import { type WidgetNode } from "@/lib/core";
import { useDaikon, useDaikonOptional, DaikonProvider } from "@/lib/context";

// Base widgets
import ScaffoldWidget from "./widgets/ScaffoldWidget";
import AppBarWidget from "./widgets/AppBarWidget";
import CenterWidget from "./widgets/CenterWidget";
import ContainerWidget from "./widgets/ContainerWidget";
import SizedBoxWidget from "./widgets/SizedBoxWidget";
import PaddingWidget from "./widgets/PaddingWidget";
import ExpandedWidget from "./widgets/ExpandedWidget";
import { DividerWidget, VerticalDividerWidget } from "./widgets/DividerWidget";

// Layout / Childrens widgets
import ColumnWidget from "./widgets/ColumnWidget";
import RowWidget from "./widgets/RowWidget";
import FlexWidget from "./widgets/FlexWidget";
import SingleChildScrollViewWidget from "./widgets/SingleChildScrollView";

// Content widgets
import TextWidget from "./widgets/TextWidget";
import ImageWidget from "./widgets/ImageWidget";
import CardWidget from "./widgets/CardWidget";

// Display widgets
import AvatarWidget, { AvatarBadgeWidget } from "./widgets/AvatarWidget";
import CodeSnippetWidget from "./widgets/CodeSnippetWidget";
import SkeletonWidget from "./widgets/SkeletonWidget";

// Feedback widgets
import ButtonWidget from "./widgets/ButtonWidget";
import ButtonGroupWidget from "./widgets/ButtonGroupWidget";
import {
    ProgressWidget,
    CircularProgressIndicatorWidget,
    LinearProgressIndicatorWidget
} from "./widgets/ProgressWidget";
import AlertDialogWidget from "./widgets/AlertDialogWidget";

// Form widgets
import TextFieldWidget from "./widgets/TextFieldWidget";
import CheckBoxWidget from "./widgets/CheckBoxWidget";

// Navigation widgets
import NavigationBarWidget, { NavigationItemWidget } from "./widgets/NavigationBarWidget";
import NavigationRailWidget, { NavigationGroupWidget, NavigationDividerWidget } from "./widgets/NavigationRailWidget";
import BreadcrumbWidget, { MoreDotsWidget } from "./widgets/BreadcrumbWidget";

// Core / Overlay widgets
import CompareWidget from "./widgets/CompareWidget";
import IconifyWidget from "./widgets/IconifyWidget";
import HoverCardWidget from "./widgets/HoverCardWidget";
import FrameWidget from "./widgets/FrameWidget";

// Debug & Toast overlays
import { X } from "lucide-react";

export function WidgetRenderer({ node }: { node: WidgetNode | null | undefined }) {
    const { idDatabase, registerId } = useDaikon();

    useEffect(() => {
        if (node?.id) {
            registerId(node.id, node.props);
        }
    }, [node, registerId]);

    if (!node || !node.name || node.name === "Empty") {
        return null;
    }

    // Check visibility in ID database
    if (node.id && idDatabase[node.id]?.visible === false) {
        return null;
    }

    // Check props override in ID database
    const finalProps =
        node.id && idDatabase[node.id]?.override && idDatabase[node.id]?.props
            ? { ...node.props, ...idDatabase[node.id].props }
            : node.props || {};

    switch (node.name) {
        // Base
        case "Scaffold":
            return <ScaffoldWidget id={node.id} {...finalProps} />;
        case "AppBar":
            return <AppBarWidget id={node.id} {...finalProps} />;
        case "Center":
            return <CenterWidget {...finalProps} />;
        case "Container":
            return <ContainerWidget id={node.id} {...finalProps} />;
        case "SizedBox":
            return <SizedBoxWidget id={node.id} {...finalProps} />;
        case "Padding":
            return <PaddingWidget id={node.id} {...finalProps} />;
        case "Expanded":
            return <ExpandedWidget id={node.id} {...finalProps} />;
        case "Divider":
            return <DividerWidget />;
        case "VerticalDivider":
            return <VerticalDividerWidget />;

        // Childrens
        case "Column":
            return <ColumnWidget id={node.id} {...finalProps} />;
        case "Row":
            return <RowWidget id={node.id} {...finalProps} />;
        case "Flex":
            return <FlexWidget id={node.id} {...finalProps} />;
        case "SingleChildScrollView":
            return <SingleChildScrollViewWidget id={node.id} {...finalProps} />;

        // Content
        case "Text":
            return <TextWidget id={node.id} {...finalProps} />;
        case "Image":
            return <ImageWidget id={node.id} {...finalProps} />;
        case "Card":
            return <CardWidget id={node.id} {...finalProps} />;

        // Display
        case "Avatar":
            return <AvatarWidget id={node.id} {...finalProps} />;
        case "AvatarBadge":
            return <AvatarBadgeWidget id={node.id} {...finalProps} />;
        case "CodeSnippet":
            return <CodeSnippetWidget id={node.id} {...finalProps} />;
        case "Skeleton":
            return <SkeletonWidget id={node.id} {...finalProps} />;

        // Feedback
        case "Button":
            return <ButtonWidget id={node.id} {...finalProps} />;
        case "ButtonGroup":
            return <ButtonGroupWidget id={node.id} {...finalProps} />;
        case "Progress":
            return <ProgressWidget id={node.id} {...finalProps} />;
        case "CircularProgressIndicator":
            return <CircularProgressIndicatorWidget id={node.id} {...finalProps} />;
        case "LinearProgressIndicator":
            return <LinearProgressIndicatorWidget id={node.id} {...finalProps} />;
        case "AlertDialog":
            return <AlertDialogWidget id={node.id} {...finalProps} />;

        // Form
        case "TextField":
            return <TextFieldWidget id={node.id} {...finalProps} />;
        case "CheckBox":
            return <CheckBoxWidget id={node.id} {...finalProps} />;

        // Navigation
        case "NavigationBar":
            return <NavigationBarWidget id={node.id} {...finalProps} />;
        case "NavigationItem":
            return <NavigationItemWidget id={node.id} {...finalProps} />;
        case "NavigationRail":
            return <NavigationRailWidget id={node.id} {...finalProps} />;
        case "NavigationGroup":
            return <NavigationGroupWidget id={node.id} {...finalProps} />;
        case "NavigationDivider":
            return <NavigationDividerWidget />;
        case "Breadcrumb":
            return <BreadcrumbWidget id={node.id} {...finalProps} />;
        case "MoreDots":
            return <MoreDotsWidget />;

        // Core / Overlay
        case "Compare":
            return <CompareWidget id={node.id} {...finalProps} />;
        case "Iconify":
            return <IconifyWidget id={node.id} {...finalProps} />;
        case "HoverCard":
            return <HoverCardWidget id={node.id} {...finalProps} />;
        case "Frame":
            return <FrameWidget id={node.id} {...finalProps} />;

        case "Empty":
            return null;

        default:
            return (
                <div className="text-xs text-amber-600 bg-amber-50 dark:bg-amber-950/40 p-2 rounded-md border border-amber-200">
                    Unknown widget: <span className="font-semibold">{node.name}</span>
                </div>
            );
    }
}

function GlobalOverlays() {
    const { toasts, closeToast, dialog, closeDialog, debugOpen, setDebugOpen, idDatabase, variables } = useDaikon();

    return (
        <>
            {/* Toast Notifications */}
            {toasts.length > 0 && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center pointer-events-none">
                    {toasts.map((toast) => (
                        <div
                            key={toast.id}
                            className="pointer-events-auto bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-3 text-sm font-medium animate-in fade-in-0 slide-in-from-bottom-4 duration-200"
                        >
                            <span>{toast.message}</span>
                            <button
                                type="button"
                                onClick={() => closeToast(toast.id)}
                                className="opacity-70 hover:opacity-100 p-0.5 transition-opacity cursor-pointer"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal Dialog */}
            {dialog.isOpen && dialog.node && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in-0 duration-150">
                    <div
                        className="fixed inset-0"
                        onClick={() => {
                            if (dialog.barrierDismissible) {
                                closeDialog();
                            }
                        }}
                    />
                    <div className="relative z-10">
                        <WidgetRenderer node={dialog.node} />
                    </div>
                </div>
            )}

            {/* Daikon Debug Drawer */}
            {debugOpen && (
                <div className="fixed inset-y-0 right-0 z-50 w-96 bg-card text-card-foreground border-l border-border shadow-2xl p-6 overflow-y-auto flex flex-col gap-4 animate-in slide-in-from-right duration-200">
                    <div className="flex items-center justify-between border-b pb-3">
                        <h3 className="font-bold text-base">Daikon Debugger</h3>
                        <button
                            type="button"
                            onClick={() => setDebugOpen(false)}
                            className="p-1 rounded-md hover:bg-muted text-muted-foreground hover:text-foreground cursor-pointer"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    <div className="flex flex-col gap-3">
                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Variables</h4>
                        <pre className="bg-muted p-3 rounded-lg text-xs overflow-x-auto max-h-48 font-mono">
                            {JSON.stringify(variables, null, 2)}
                        </pre>

                        <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-2">ID Registry</h4>
                        <div className="flex flex-col gap-2">
                            {Object.entries(idDatabase).map(([id, data]) => (
                                <div key={id} className="border border-border/60 p-2.5 rounded-lg text-xs bg-muted/30">
                                    <div className="font-mono font-semibold text-primary">{id}</div>
                                    <div className="text-[11px] text-muted-foreground mt-1">
                                        Visible: {data.visible ? "true" : "false"} | Override: {data.override ? "true" : "false"}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default function Renderer({ node }: { node: WidgetNode | null | undefined }) {
    const hasContext = useDaikonOptional();

    if (hasContext) {
        return <WidgetRenderer node={node} />;
    }

    return (
        <DaikonProvider>
            <WidgetRenderer node={node} />
            <GlobalOverlays />
        </DaikonProvider>
    );
}