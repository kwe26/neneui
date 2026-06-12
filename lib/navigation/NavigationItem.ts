import { Empty } from "../empty_shell";

export interface NavigationItemProps {
    key: number
    label: string,
    child: any,
}

export function NavigationItem({
    key = 0,
    label = "Home",
    child = Empty()
}: NavigationItemProps){
    return {
        id: `IconBottom${key}`,
        name: "NavigationItem",
        props:{
            key,
            label,
            child
        }
    }
}