import { BreadcrumbSeparator } from "../widgets";

export interface BreadcrumbProps {
    separator: BreadcrumbSeparator,
    children: any[]
}

export function MoreDots() {
    return {
        id: "#moredos",
        name: "MoreDots",
        props: {}
    }
}

export function Breadcrumb(id: string, {
    separator = BreadcrumbSeparator.arrowSeparator,
    children = []
}: BreadcrumbProps){
    return {
        id,
        name: "Breadcrumb",
        props: {
            separator,
            children
        }
    }
}