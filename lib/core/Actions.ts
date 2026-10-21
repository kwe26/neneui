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
    PAY ="pay",
    LAUNCH_URL = "launch_url",
    SELECT_FILE = "select_file",
    SET_PREFS = "set_prefs",
    REM_PREFS = "rem_prefs",
    SOFT_RELOAD = "soft_reload",
    PREF_EXISTS = "exist_prefs",
    SEND_SOCKET = "send_socket",
    MULTI_ACTION = "multi_action",
    SET_DISPLAY_INDEX= "set_display_index",
    CLOSE_OVERLAY = "close_overlay",
    CLEAR = "clear"
}

export function DoAction(action: Action, data: any){
    return {
        action,
        data
    }
}