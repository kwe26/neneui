export interface ProgressProps {
    progress: number,
    color: string,
    backgroundColor: string
}

export function Progress(id: string, {
    progress = 1,
    color = "#ff0000",
    backgroundColor = "#cdfff0"
}: ProgressProps) {
    return {
        id,
        name: "Progress",
        props: {
            progress,
            color,
            backgroundColor
        }
    }
}