import { BoxConstraints, type BoxConstraintsProps } from "../widgets";

export interface CodeSnippetProps {
    code: string,
    lang?: string,
    constraints?: any,
    actions?: any[]
}

export function CodeSnippet(id: string,{
    code = `print('Hello World')`,
    lang = "dart",
    constraints = BoxConstraints({}),
    actions = []
}: CodeSnippetProps){
    return {
        id,
        name: "CodeSnippet",
        props: {
            code,
            lang,
            constraints,
            actions
        }
    }
}

