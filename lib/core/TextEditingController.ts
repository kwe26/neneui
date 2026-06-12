export interface TextEditingControllerProps {
    value?: string
}

export function TextEditingController({
    value = ""
}: TextEditingControllerProps){
    return {
        name: "TextEditingController",
        props: {
            value
        }
    }
}