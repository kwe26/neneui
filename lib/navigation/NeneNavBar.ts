export enum NavType {
    normal = "normal",
    float = "float"
}

export interface NeneNavItemProp {
    index: number,
    icon: any,
    title: string
}

export function NeneNavItem({
    index,
    icon,
    title
}: NeneNavItemProp) {
    return {
        index,
        icon,
        title
    }
}

export interface NeneNavBottomProps {
    items: NeneNavItemProp[],
    executeDisplay?: boolean,
    type?: NavType,
}

export function NeneNavbottom({
    items,
    executeDisplay = false,
    type = NavType.normal
}: NeneNavBottomProps) {
    return {
        id: "#bottomBar",
        name: "NeneNavbottom",
        props: {
            items,
            type,
            executeDisplay
        }
    }
}