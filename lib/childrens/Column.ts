import { CrossAxis, Empty, MainAxis } from "../widgets";

export interface ColumnProps {
    mainAxisAlignment: MainAxis,
    crossAxisAlignment: CrossAxis,
    children: any[]
}

export function Column(id: string, {
    mainAxisAlignment = MainAxis.start,
    crossAxisAlignment = CrossAxis.start,
    children = [Empty()]
}: ColumnProps) {
    return {
        id,
        name: "Column",
        props: {
            mainAxis: mainAxisAlignment,
            crossAxis: crossAxisAlignment,
            children: children
        }
    }
}