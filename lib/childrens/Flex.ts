import { CrossAxis, Direction, Empty, MainAxis, TextDirection } from "../widgets";

export interface FlexProps {
    children: any[],
    crossAxisAlignment: CrossAxis,
    mainAxisAlignment: MainAxis,
    spacing: number,
    textDirection: TextDirection,
    direction: Direction
}

export function Flex(id: string, {
    children = [Empty()],
    crossAxisAlignment = CrossAxis.start,
    mainAxisAlignment = MainAxis.start,
    spacing = 0,
    textDirection = TextDirection.ltr,
    direction = Direction.Vertical,
}: FlexProps) {
    return {
        id,
        name: "Flex",
        props: {
            children,
            crossAxisAlignment,
            mainAxisAlignment,
            spacing,
            textDirection,
            direction
        }
    }
}