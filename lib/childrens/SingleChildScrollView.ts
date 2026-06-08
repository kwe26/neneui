import { Direction, Empty, ScrollPhysics } from "../widgets";

export interface SingleChildScrollViewProps {
    child: any,
    physics?: ScrollPhysics,
    scrollDirection?: Direction,
    reverse?: boolean
}

export function SingleChildScrollView(id: string, {
    child = Empty(),
    physics = ScrollPhysics.Scroll,
    scrollDirection = Direction.Vertical,
    reverse = false
}: SingleChildScrollViewProps){
    return {
        id,
        name: "SingleChildScrollView",
        props: {
            child,
            physics,
            scrollDirection,
            reverse
        }
    }
}