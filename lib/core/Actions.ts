export enum Action {
    SHOW_TOAST = "show_toast",
    NAVIGATE = "navigate",
    NAVIGATE_PUSH_REPLACE = "navigate_pushreplace",
    NAVIGATE_POP = "pop",
    HIDE = "hide",
    SHOW = "show",
    DEBUG = "daikon",
    DIALOG = "dialog",
    SUBMIT = "submit",
    SET_VAR = "setvar",
    PROPS = "props"
}

export function DoAction(action: Action, data: any){
    return {
        action,
        data
    }
}