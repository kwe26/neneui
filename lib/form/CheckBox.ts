import { Empty } from "../widgets";

export interface CheckBoxProps{
    trailing: any,
    value: boolean
}

export function CheckBox(id: string, {
    trailing = Empty(),
    value = true,
}: CheckBoxProps){
    return {
        id,
        name: "CheckBox",
        props: {
            trailing,
            value
        }
    }
}