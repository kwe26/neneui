import { Empty } from "../empty_shell";

export interface LayoutProps {
    widget: any,
    width?: number
}

export function Layout(id: string, {
    widget = Empty(),
    width = 0
}: LayoutProps) {
    return {
        id,
        name: "Layout",
        props: {
            widget,
            width
        }
    }
}

export interface LayoutsProps{
    layouts: any[],
    fixed?: boolean,
}

export function Layouts(id: String, {
    layouts = [
        Layout('#sampleLayout', {
            widget: Empty()
        })
    ],
    fixed = false
}: LayoutsProps){
    return {
        id,
        name: "Layouts",
        props: {
            layouts,
            fixed
        }
    }
}