export enum Action {
    SHOW_TOAST = "show_toast",
    NAVIGATE = "navigate",
    NAVIGATE_PUSH_REPLACE = "navigate_pushreplace",
    HIDE = "hide",
    SHOW = "show"
}

export function DoAction(action: Action, data: any){
    return {
        action,
        data
    }
}