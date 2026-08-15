import { CrossAxis, Empty, MainAxis } from "../widgets";

export interface RowProps {
    mainAxisAlignment?: MainAxis,
    crossAxisAlignment?: CrossAxis,
    foreach?: boolean,
    children: any[]
}

export function Row(id: string, {
    mainAxisAlignment = MainAxis.start,
    crossAxisAlignment = CrossAxis.start,
    foreach = false,
    children = [Empty()]
}: RowProps) {
    return {
        id,
        name: "Row",
        props: {
            mainAxis: mainAxisAlignment,
            crossAxis: crossAxisAlignment,
            foreach,
            children: children
        }
    }
}