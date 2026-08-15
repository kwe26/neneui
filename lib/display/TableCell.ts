import { Empty } from "../empty_shell";

export interface TableCellProps {
    columnSpan?: number,
    rowSpan?: number,
    child: any,
    rowHover?: boolean,
    backgroundColor?: string
}

export function TableCell(id: string, {
    columnSpan = 1,
    rowSpan = 1,
    child = Empty(),
    rowHover = true,
    backgroundColor = ""
} : TableCellProps){
    return {
        id,
        name: "TableCell",
        props: {
            columnSpan,
            rowSpan,
            child,
            rowHover,
            backgroundColor
        }
    }
}