export enum WhenJSPload {
    loadPage = "loadPage",
    none = "none"
}

export interface JSPreload {
    url: string,
    when: WhenJSPload,
    onPage?: string
}

export interface JavascriptEngine {
    enabled: boolean,
    scripts?: WhenJSPload[],
    forceJavascriptCoreOnAndroid?: boolean,
    xhr?: boolean,
    stackSize?: number
}

export function JavaScriptEngine({
    enabled = true,
    scripts = [],
    forceJavascriptCoreOnAndroid = false,
    xhr = true,
    stackSize = 5*1024*1024
}: JavascriptEngine){
    return {
        enabled,
        scripts,
        forceJavascriptCoreOnAndroid,
        xhr,
        stackSize
    }
}