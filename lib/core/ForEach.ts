import { Empty } from "../empty_shell"

export interface ForEachInterface {
    varToForEach: string,
    namespaceVar: string,
    child: any,
}

export function ForEach(id: string, {
    varToForEach = "",
    namespaceVar = "",
    child = Empty()
} : ForEachInterface) {
    return {
        id,
        name: "ForEach",
        props: {
            varToForEach,
            namespaceVar,
            child
        }
    }
}