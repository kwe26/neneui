export interface FrameProps{
    framePath: String
}

export function Frame(id: string, {
    framePath = "/ui/main"
}: FrameProps){
    return {
        id,
        name: "Frame",
        props: {
            framePath
        }
    }
}