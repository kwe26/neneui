import { Empty } from "../empty_shell";

export interface CompareProps{
    fi: string,
    ifEqualTo: string,
    then: any
    or?: any,
}

export function Compare({
    fi = "noIf",
    ifEqualTo = "noIf",
    then = Empty(),
    or = Empty(),
}: CompareProps){
    return {
        name: "Compare",
        props: {
            fi,
            ifEqualTo,
            then,
            or
        }
    }
}