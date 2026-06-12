import { Empty, NavigationBarAlignment, NavigationLabelType } from "../widgets";

export interface NavigationBarProps{
    alignment: NavigationBarAlignment,
    labelType: NavigationLabelType,
    expanded: boolean,
    selectedKey: string,
    children: any[]
}

export function NavigationBar(id: string, {
    alignment = NavigationBarAlignment.center,
    labelType = NavigationLabelType.none,
    expanded = false,
    selectedKey = id,
    children = [Empty()]
}: NavigationBarProps){
    return {
        id,
        name: "NavigationBar",
        props: {
            alignment,
            labelType,
            expanded,
            selectedKey,
            children
        }
    };
}