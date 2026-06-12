export interface IconifyProps {
    size?: number,
    prefix?: string
}

export function Iconify(name: string, {size = 24, prefix = "material-symbols"}: IconifyProps){
    return {
        name: "Iconify",
        props: {
            icon: prefix + "/" + name,
            size
        }
    }
}