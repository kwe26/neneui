export interface TableRowProps {
    cells: any[],
    selected?: boolean,
}

export function TableRow(id: string, {
    cells = [],
    selected = false
}: TableRowProps){
    return{
        id,
        name: "TableRow",
        props: {
            cells,
            selected
        }
    }
}