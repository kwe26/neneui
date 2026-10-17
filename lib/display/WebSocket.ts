import { Action, DoAction } from "../widgets"

export enum ScrollSide {
    DOWN = "down",
    UP = "up"
}

export interface WebSocketProps {
    url: string,
    actionRecv?: string,
    widgetRecv?: string,
    errorAction?: any,
    dataScroll?: ScrollSide 
}

export function WebSocket({
    url,
    actionRecv = "action_recv",
    widgetRecv = "widget_recv",
    errorAction = DoAction(Action.SHOW_TOAST, "Oops Something Went Wrong!"),
    dataScroll = ScrollSide.DOWN
}: WebSocketProps) {
    return {
        id: "#webSocket",
        name: "WebSocket",
        props: {
            url,
            actionRecv,
            widgetRecv,
            errorAction,
            dataScroll
        }
    }
}