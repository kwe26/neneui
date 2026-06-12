import type { Alignment, NavigationLabelPosition, NavigationLabelType } from "../widgets";

export interface NavigationRailProps {
    alignment?: Alignment,
    labelType?: NavigationLabelType,
    labelPosition?: NavigationLabelPosition,
    header?: any[],
    footer?: any[],
    expanded: boolean,
    children: any[],
}

export function NavigationRail(id: string, {
    alignment,
    labelType,
    labelPosition,
    header = [],
    footer = [],
    expanded,
    children
}: NavigationRailProps) {
    return {
        id,
        name: "NavigationRail",
        props: {
            alignment,
            labelType,
            labelPosition,
            header,
            footer,
            expanded,
            children
        }
    }
}