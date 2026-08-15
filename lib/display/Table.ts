import { FixedTableSize } from "./TableSize";

export interface TableProps {
    rows: any[],
    defaultColumnWidth?: any,
    foreach: boolean,
    columnWidths: Map<number, any>,
}

export function Table(id: string, {
    rows = [],
    defaultColumnWidth = FixedTableSize(10),
    foreach = false,
    columnWidths
}: TableProps){
    return {
        id,
        name: "Table",
        props: {
            rows,
            defaultColumnWidth,
            foreach,
            columnWidths
        }
    }
}