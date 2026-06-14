import { Empty } from "../empty_shell"

export interface HoverCard {
    hoverCard: any,
    child: any
}

export function HoverCard(id: string, {
    hoverCard = Empty(),
    child = Empty()
}: HoverCard){
    return {
        id,
        name: "HoverCard",
        props: {
            hoverCard,
            child
        }
    }
}