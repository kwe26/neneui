import { Empty } from "../empty_shell";

export interface ScaffoldProps {
    appBar?: any,
    body?: object,
    drawer?: any,
    floatingActionButton?: any,
    backgroundColor?: string,
    bottom?: any,
    floatingActionButtonLocation?: any,
}

export function Scaffold(id: string,{
    appBar = Empty(),
    body = Empty(),
    drawer = Empty(),
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
            body,
            drawer,
            floatingActionButton,
            backgroundColor,
            bottom,
            floatingActionButtonLocation
        }
    }
}