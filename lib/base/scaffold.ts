import { Empty } from "../empty_shell";
import type { Action } from "../widgets";
import { Seo, type SeoProps } from "./seo";

export interface ScaffoldProps {
    appBar?: any,
    body?: object,
    seo?: SeoProps,
    drawer?: any,
    preActions?: {action: Action, data: any}[],
    floatingActionButton?: any,
    backgroundColor?: string,
    bottom?: any,
    floatingActionButtonLocation?: any,
}

export function Scaffold(id: string,{
    appBar = Empty(),
    body = Empty(),
    seo = Seo({}),
    drawer = Empty(),
    preActions = [],
    floatingActionButton = Empty(),
    bottom = Empty(),
    backgroundColor = "#00000",
    floatingActionButtonLocation = null,
}: ScaffoldProps) {
    return {
        id: id,
        name: "Scaffold",
        props: {
            appBar,
            seo,
            body,
            preActions,
            drawer,
            floatingActionButton,
            backgroundColor,
            bottom,
            floatingActionButtonLocation
        }
    }
}