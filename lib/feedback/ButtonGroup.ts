import { Direction } from "../widgets";

export interface ButtonGroupProps {
    children: any,
    direction?: Direction
}

export function ButtonGroup(id: string, {
    children = [],
    direction = Direction.Horizontal
}: ButtonGroupProps){
    return {
        id,
        name: "ButtonGroup",
        props: {
            children,
            direction
        }
    };
}