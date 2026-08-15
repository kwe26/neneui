import { CrossAxis, Empty, MainAxis } from "../widgets";

export interface ColumnProps {
    mainAxisAlignment?: MainAxis,
    crossAxisAlignment?: CrossAxis,
    foreach?: boolean,
    children: any[] | {
        id: string;
        name: string;
        props: {
            varToForEach: string;
            namespaceVar: string;
            child: any;
        };
    }
}

export function Column(id: string, {
    mainAxisAlignment = MainAxis.start,
    foreach = false,
    crossAxisAlignment = CrossAxis.start,
    children = [Empty()]
}: ColumnProps) {
    return {
        id,
        name: "Column",
        props: {
            foreach,
            mainAxis: mainAxisAlignment,
            crossAxis: crossAxisAlignment,
            children: children
        }
    }
}