export interface CircularProgressIndicatorProps {
    color?: string,
    strokeWidth?: number
}

export function CircularProgressIndicator(id: string, {
    color = "#0F0F0F",
    strokeWidth = 10
}: CircularProgressIndicatorProps){
    return {
        id,
        name: "CircularProgressIndicator",
        props: {
            color,
            strokeWidth
        }
    };
}

export interface LinearProgressIndicatorProps {
    color?: string,
    minHeight?: number
}

export function LinearProgressIndicator(id: string, {
    color=  "#000000",
    minHeight = 3
}: LinearProgressIndicatorProps){
    return {
        id,
        name: "LinearProgressIndicator",
        props: {
            color,
            minHeight
        }
    }
}