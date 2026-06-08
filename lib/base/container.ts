import { Empty } from "../empty_shell";

export interface ContainerProps {
    child?: any,
    decoration?: any
}

export function Container(
    id: string,
    {
        child = Empty(),
        decoration = Empty()
    }: ContainerProps
){
    return {
        id: id,
        name: "Container",
        props: {
            child,
            decoration
        }
    }
}