import { DateTime } from "../core/DateTime";
import { DateFormat, PromptMode, Text } from "../widgets";

export interface DatePickerProps{
    mode: PromptMode,
    dialogTitle?: any,
    dateFormat? : DateFormat,
    defaultDate: DateTime
}

export function DatePicker(id: string, {
    mode = PromptMode.popup,
    dialogTitle = Text("#dText", {text: "Dialog Picker"}),
    dateFormat = DateFormat.ddmmyyyy,
    defaultDate = DateTime.now()
}: DatePickerProps){
    return {
        id,
        name: "DatePicker",
        props: {
            dialogTitle,
            defaultDate: defaultDate.timestamp.toString(),
            dateFormat,
            mode
        }
    };
}