import { Empty } from "../empty_shell";

export interface ExpandedProps {
    child: any,
    flex: number
}

export function Expanded(id: string, {
    child = Empty(),
    flex = 1
}: ExpandedProps){
    return {
        id: id,
        name: "Expanded",
        props: {
            child,
            flex
        }
    }
}