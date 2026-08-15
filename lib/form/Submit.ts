export interface FormSubmitActionProps {
    variables: string[],
    varNames: string[],
    fileVariable?: string[],
    fileNames?: string[],
    headers?: {},
    callbackPath: string
}

export function FormSubmitAction({
    variables = [],
    varNames = [],
    fileVariable = [],
    fileNames = [],
    headers = {},
    callbackPath = "/ui/callA"
}: FormSubmitActionProps){
    if(variables.length == varNames.length){
        return {
            variables,
            varNames,
            headers,
            fileNames,
            fileVariable,
            callbackPath
        }
    }else{
        throw new Error('Variables and Variable Names must be Specified Respectively.')
    }
}