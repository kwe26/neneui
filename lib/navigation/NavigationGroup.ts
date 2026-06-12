import { Alignment, Empty } from "../widgets";

export interface NavigationGroupProps {
    label: string,
    children: any[],
    labelAlignment: Alignment
}

export function NavigationGroup({
    label = "NavigationGroup",
    children = [Empty()],
    labelAlignment = Alignment.topLeft
} : NavigationGroupProps) {
    return {
        id: "#NavGroup_"+label.replaceAll("_", "").replaceAll("/", "").replaceAll("\\", ""),
        name: "NavigationGroup",
        props: {
            label,
            children,
            labelAlignment
        }
    }
}