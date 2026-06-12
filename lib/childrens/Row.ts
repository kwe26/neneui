import { CrossAxis, Empty, MainAxis } from "../widgets";

export interface RowProps {
    mainAxisAlignment?: MainAxis,
    crossAxisAlignment?: CrossAxis,
    children: any[]
}

export function Row(id: string, {
    mainAxisAlignment = MainAxis.start,
    crossAxisAlignment = CrossAxis.start,
    children = [Empty()]
}: RowProps) {
    return {
        id,
        name: "Row",
        props: {
            mainAxis: mainAxisAlignment,
            crossAxis: crossAxisAlignment,
            children: children
        }
    }
}