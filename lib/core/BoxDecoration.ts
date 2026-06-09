export interface BoxDecoration {
    color?: string,
    image?: string,
    radius?: number,
    borderColor?: string
    borderWidth?: number
}

export function BoxDecoration({
    color = "#FFFFFF",
    image = "none",
    radius = 1,
    borderColor = "#FFFFFF",
    borderWidth = 1
}: BoxDecoration){
    return {
        color,
        image,
        radius,
        borderColor,
        borderWidth
    }
}