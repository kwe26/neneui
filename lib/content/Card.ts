import type { EdgeInsets } from "../widgets";

export interface CardProps {
    padding: EdgeInsets,
    child?: any,
    color?: string,
    type: "filled" | "outlined" | "normal"
}

export function Card(id: string, {
    child,
    padding,
    color,
    type = "normal"
}: CardProps){
    return {
        id,
        name: "Card",
        props: {
            padding,
            color,
            type,
            child
        }
    }
}