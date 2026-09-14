export interface VideoPluginInterface {
    url?: string,
    width: number,
    height: number
}

export function VideoPlugin(id: string, {
    url,
    width = 100,
    height = 100
}:VideoPluginInterface){
    return {
        name: "VideoFrame",
        id,
        props:{
            url,
            width,
            height
        }
    }
}