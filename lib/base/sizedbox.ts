import { Empty } from "../empty_shell";

export interface SizedBoxProps {
    child?: any,
    width?: number,
    height?: number
}

export function SizedBox(id: string, {
    child = Empty(),
    width = 1,
    height = 1
}: SizedBoxProps){
    return {
        id,
        name: "SizedBox",
        props: {
            child,
            width,
            height
        }
    }
}