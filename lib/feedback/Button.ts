import { Action, ButtonDensity, ButtonShape, ButtonType, DoAction, Empty } from "../widgets";

export interface ButtonProps {
    child: any,
    leading?: any,
    type: ButtonType,
    density: ButtonDensity,
    disabled: boolean,
    shape: ButtonShape
    onPressed: any
}

export function Button(id: string, {
    child,
    leading = Empty(),
    type = ButtonType.Normal,
    density = ButtonDensity.normal,
    shape = ButtonShape.rectangle,
    disabled = false,
    onPressed = DoAction(Action.SHOW_TOAST, "Hello World")
}: ButtonProps) {
    return {
        id,
        name: "Button",
        props: {
            child,
            leading,
            type,
            density,
            shape,
            disabled,
            onPressed
        }
    }
}

