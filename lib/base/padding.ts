import { Empty } from "../empty_shell";
import { EdgeInsets } from "./EdgeInsets";

export interface PaddingProps {
    padding: EdgeInsets,
    child?: any
}

export function Padding(id: string, {
    padding = EdgeInsets.all(1),
    child = Empty()
}: PaddingProps){
    return {
        id,
        name: "Padding",
        props: {
            child,
            padding: {
                l: padding.left,
                r: padding.right,
                t: padding.top,
                b: padding.bottom
            }
        }
    }
}