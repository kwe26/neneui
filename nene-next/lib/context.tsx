"use client";

import React, { createContext, useContext, useState, useCallback, useTransition } from "react";
import { Action, type WidgetNode } from "./core";
import { useRouter } from "next/navigation";

export interface DaikonState {
    variables: Record<string, any>;
    idDatabase: Record<string, { visible?: boolean; override?: boolean; props?: any }>;
    toasts: Array<{ id: string; message: string }>;
    dialog: { isOpen: boolean; node: WidgetNode | null; barrierDismissible?: boolean };
    debugOpen: boolean;
    setVariable: (name: string, value: any) => void;
    registerId: (id: string, props: any) => void;
    hideId: (id: string) => void;
    showId: (id: string) => void;
    overrideProps: (id: string, props: any) => void;
    performAction: (action: Action | string, data: any) => Promise<void> | void;
    parseVariable: (data: any) => string;
    getVariable: (key: string) => any;
    closeDialog: () => void;
    closeToast: (id: string) => void;
    setDebugOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const DaikonContext = createContext<DaikonState | null>(null);

export function useDaikon() {
    const ctx = useContext(DaikonContext);
    if (!ctx) {
        throw new Error("useDaikon must be used within a DaikonProvider");
    }
    return ctx;
}

export function useDaikonOptional() {
    return useContext(DaikonContext);
}

export function DaikonProvider({
    children,
    initialVariables = {},
    baseUrl = "http://localhost:3500"
}: {
    children: React.ReactNode;
    initialVariables?: Record<string, any>;
    baseUrl?: string;
}) {
    const router = useRouter();
    const [, startTransition] = useTransition();

    const [variables, setVariables] = useState<Record<string, any>>(initialVariables);
    const [idDatabase, setIdDatabase] = useState<Record<string, { visible?: boolean; override?: boolean; props?: any }>>({});
    const [toasts, setToasts] = useState<Array<{ id: string; message: string }>>([]);
    const [dialog, setDialog] = useState<{ isOpen: boolean; node: WidgetNode | null; barrierDismissible?: boolean }>({
        isOpen: false,
        node: null,
        barrierDismissible: true
    });
    const [debugOpen, setDebugOpen] = useState(false);

    const setVariable = useCallback((name: string, value: any) => {
        setVariables((prev) => ({
            ...prev,
            [name]: value
        }));
    }, []);

    const getVariable = useCallback((key: string) => {
        return variables[key];
    }, [variables]);

    const registerId = useCallback((id: string, props: any) => {
        if (!id || id.startsWith("#Empty_")) return;
        setIdDatabase((prev) => {
            if (prev[id]) return prev;
            return {
                ...prev,
                [id]: {
                    visible: true,
                    override: false,
                    props
                }
            };
        });
    }, []);

    const hideId = useCallback((id: string) => {
        setIdDatabase((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                visible: false
            }
        }));
    }, []);

    const showId = useCallback((id: string) => {
        setIdDatabase((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                visible: true
            }
        }));
    }, []);

    const overrideProps = useCallback((id: string, props: any) => {
        setIdDatabase((prev) => ({
            ...prev,
            [id]: {
                visible: true,
                override: true,
                props
            }
        }));
    }, []);

    const closeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const addToast = useCallback((message: string) => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message }]);
        setTimeout(() => {
            closeToast(id);
        }, 3500);
    }, [closeToast]);

    const closeDialog = useCallback(() => {
        setDialog({ isOpen: false, node: null, barrierDismissible: true });
    }, []);

    const parseVariable = useCallback((data: any): string => {
        if (data === null || data === undefined) return "";
        if (typeof data === "string" || typeof data === "number" || typeof data === "boolean") {
            return String(data);
        }
        if (typeof data === "object" && data.template && data.variable) {
            let template = String(data.template);
            const varKeys = String(data.variable).split(",").map((k) => k.trim());
            varKeys.forEach((key, index) => {
                const val = variables[key] !== undefined ? variables[key] : (key.startsWith("#") ? "" : key);
                template = template.replace(new RegExp(`%${index + 1}`, "g"), String(val ?? ""));
            });
            return template;
        }
        return String(data);
    }, [variables]);

    const performAction = useCallback(async (action: Action | string, data: any) => {
        console.log(`[Daikon Action] ${action}:`, data);
        switch (action) {
            case Action.SHOW_TOAST:
            case "show_toast": {
                addToast(typeof data === "string" ? data : JSON.stringify(data));
                break;
            }

            case Action.NAVIGATE:
            case "navigate": {
                if (typeof data === "string") {
                    startTransition(() => {
                        router.push(data);
                    });
                }
                break;
            }

            case Action.NAVIGATE_PUSH_REPLACE:
            case "navigate_pushreplace": {
                if (typeof data === "string") {
                    startTransition(() => {
                        router.replace(data);
                    });
                }
                break;
            }

            case Action.NAVIGATE_POP:
            case "pop": {
                router.back();
                break;
            }

            case Action.HIDE:
            case "hide": {
                if (typeof data === "string") {
                    hideId(data);
                }
                break;
            }

            case Action.SHOW:
            case "show": {
                if (typeof data === "string") {
                    showId(data);
                }
                break;
            }

            case Action.DEBUG:
            case "daikon": {
                setDebugOpen((prev) => !prev);
                break;
            }

            case Action.SET_VAR:
            case "setvar": {
                if (data && typeof data === "object" && ("var" in data || "variable" in data)) {
                    const key = data.var || data.variable;
                    const val = data.val !== undefined ? data.val : data.value;
                    setVariable(key, val);
                }
                break;
            }

            case Action.DIALOG:
            case "dialog": {
                if (data) {
                    const barrierDismissible = data.props?.barrierDismissible !== false;
                    setDialog({
                        isOpen: true,
                        node: data,
                        barrierDismissible
                    });
                }
                break;
            }

            case Action.LAUNCH_URL:
            case "launch_url": {
                if (data?.url) {
                    window.open(data.url, "_blank");
                }
                break;
            }

            case Action.PROPS:
            case "props": {
                if (data?.id && data?.props) {
                    overrideProps(data.id, data.props);
                }
                break;
            }

            case Action.JAVASCRIPT:
            case "js": {
                try {
                    // eslint-disable-next-line no-eval
                    eval(String(data));
                } catch (e) {
                    console.error("Error executing JS action:", e);
                }
                break;
            }

            case Action.SUBMIT:
            case "submit": {
                try {
                    const postUrl = baseUrl + (data.callbackPath || "/ui/callA");
                    const bodyPayload: Record<string, any> = {};
                    if (Array.isArray(data.variables) && Array.isArray(data.varNames)) {
                        data.variables.forEach((vb: string, idx: number) => {
                            const keyName = data.varNames[idx];
                            bodyPayload[keyName] = variables[vb] ?? "";
                        });
                    }
                    const response = await fetch(postUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            ...(data.headers || {})
                        },
                        body: JSON.stringify(bodyPayload)
                    });
                    const resJson = await response.json();
                    if (resJson.callbacks && Array.isArray(resJson.callbacks)) {
                        for (const cb of resJson.callbacks) {
                            performAction(cb.action, cb.data);
                        }
                    }
                } catch (err: any) {
                    addToast(`Submit error: ${err.message || err}`);
                }
                break;
            }

            default: {
                console.warn(`[Daikon Action] Unhandled action:`, action, data);
            }
        }
    }, [addToast, hideId, showId, overrideProps, setVariable, baseUrl, router, variables]);

    return (
        <DaikonContext.Provider
            value={{
                variables,
                idDatabase,
                toasts,
                dialog,
                debugOpen,
                setVariable,
                registerId,
                hideId,
                showId,
                overrideProps,
                performAction,
                parseVariable,
                getVariable,
                closeDialog,
                closeToast,
                setDebugOpen
            }}
        >
            {children}
        </DaikonContext.Provider>
    );
}
