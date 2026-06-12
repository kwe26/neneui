import { PromptMode } from "../widgets";

export interface DatePickerProps{
    mode: PromptMode,
    dialogTitle?: any,
    defaultDate: number
}

export function DatePicker(id: string, {
    mode = PromptMode.popup,
    dialogTitle,
    defaultDate = Date.now()
}: DatePickerProps){
    return {
        id,
        name: "DatePicker",
        props: {
            dialogTitle,
            defaultDate,
            mode
        }
    };
}