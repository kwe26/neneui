import { Colors } from "./core"

export interface IconifyProps {
    size?: number,
    color?: string
    prefix?: string
}

export function Iconify(name: string, {size = 24, color = Colors.black, prefix = "material-symbols"}: IconifyProps){
    return {
        name: "Iconify",
        props: {
            icon: prefix + "/" + name,
            color,
            size
        }
    }
}