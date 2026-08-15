import { Action, DoAction, setVar } from "../widgets";

export interface InputOTPProps {
    initialValue?: string
    onChanged?: any,
    onSubmitted?: any,
    children: any[],
}

export function InputOTP(id: string, {
    initialValue = "",
    onChanged = null,
    onSubmitted = DoAction(Action.SET_VAR, setVar({value: "a", variable: "a"})),
    children
}: InputOTPProps) {
    return {
        id,
        name: "InputOTP",
        props:{
            initialValue,
            onChanged,
            onSubmitted,
            children
        }
    }
}

export interface InputOtpCharacterProps{
    allowDigit: boolean,
    allowLowercaseAlphabet?: boolean,
    allowUppercaseAlphabet?: boolean,
    obscured?: boolean,
    onlyUppercaseAlphabet?: boolean,
    onlyLowercaseAlphabet?: boolean,
    readOnly?: boolean
}

class InputOTPChildCLass {
    constructor() {}

    character({
        allowDigit = true,
        allowLowercaseAlphabet = false,
        allowUppercaseAlphabet = false,
        onlyLowercaseAlphabet = false,
        obscured = false,
        onlyUppercaseAlphabet = false,
        readOnly = false,
    } : InputOtpCharacterProps){
        return {
            id: "#InputCharacterID0Ch",
            name: "InputOTPCharacter",
            props: {
                allowDigit,
                allowLowercaseAlphabet,
                allowUppercaseAlphabet,
                onlyLowercaseAlphabet,
                obscured,
                onlyUppercaseAlphabet,
                readOnly
            }
        }
    }

    space() {
        return {
            id: "#InputCharacterID0ChSp",
            name: "InputOTPSpace",
            props: {}
        }
    }

    separator() {
        return {
            id: "#InputCharacterID0ChSap",
            name: "InputOTPSeparator",
            props: {}
        }
    }
}

const InputOTPChild = new InputOTPChildCLass();

export {
    InputOTPChild
};