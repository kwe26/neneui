export interface BoxConstraintsProps {
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number
}

export function BoxConstraints({
    minHeight = 0.0,
    maxHeight = Infinity,
    minWidth = 0.0,
    maxWidth = Infinity
}: BoxConstraintsProps){
    return {
        name: "BoxConstraints",
        props: {
            minHeight,
            maxHeight,
            minWidth,
            maxWidth
        }
    }
}