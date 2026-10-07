export interface NeneDisplayProps {
    followIndex?: string,
    urlMap: any
}

export function NeneDisplay({
    followIndex = "_index_",
    urlMap = {0: "/route/home"}
} : NeneDisplayProps){
    return {
        id: "#neneDisplay",
        name: "NeneDisplay",
        props: {
            followIndex,
            urlMap
        }
    }
}