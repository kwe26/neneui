import { InputType, Text, TextEditingController } from "../widgets";

export interface TextFieldProps {
    controller?: any,
    placeholder?: any,
    inputType?: InputType
    features?: any[],
}

export function TextField(id: string,{
    controller = TextEditingController({value : ""}),
    placeholder = Text("#placeText", {text: "Enter"}),
    inputType = InputType.text,
    features = []
} : TextFieldProps){
    return {
        id,
        name: "TextField",
        props:{
            controller,
            placeholder,
            inputType,
            features
        }
    }
}