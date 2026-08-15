import type { FlexFit } from "../widgets";

export function FlexTableSize(flex: number, fit: FlexFit){
    return {
        name: "FlexTableSize",
        props: {
            flex,
            fit
        }
    }
}

export function FixedTableSize(value: number){
    return {
        name: "FixedTableSize",
        props: {
            value
        }
    }
}