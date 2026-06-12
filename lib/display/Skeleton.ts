export function Skeleton(id: string, ui: any){
    return {
        id: id,
        name: "Skeleton",
        props: {
            child: ui
        }
    }
}