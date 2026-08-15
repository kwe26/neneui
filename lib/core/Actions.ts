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
    JAVASCRIPT = "js",
    PROPS = "props",
    LAUNCH_URL = "launch_url",
    SELECT_FILE = "select_file"
}

export function DoAction(action: Action, data: any){
    return {
        action,
        data
    }
}