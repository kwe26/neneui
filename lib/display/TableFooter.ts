export interface TableFooterProps {
    cells: any[]
}

export function TableFooter(id: string, {
    cells = []
}: TableFooterProps){
    return{
        id,
        name: "TableFooter",
        props: {
            cells
        }
    }
}