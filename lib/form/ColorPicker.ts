import { Axis, PromptMode } from "../widgets";

export interface ColorPickerProps{
    value?: string,
    orientation?: Axis,
    promptMode?: PromptMode,
    onChanged?: any,
    showLabel?: boolean
}

export function ColorPicker(id: string, {
    value = "#FFFFF",
    orientation = Axis.horizontal,
    promptMode = PromptMode.popup,
    onChanged = null,
    showLabel = false,
}: ColorPickerProps){
    return {
        id,
        name: "ColorPicker",
        props:{
            value,
            orientation,
            promptMode,
            onChanged,
            showLabel
        }
    }
}