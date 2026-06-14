export interface FormSubmitActionProps {
    variables: string[],
    varNames: string[],
    headers?: {},
    callbackPath: string
}

export function FormSubmitAction({
    variables = [],
    varNames = [],
    headers = {},
    callbackPath = "/ui/callA"
}: FormSubmitActionProps){
    if(variables.length == varNames.length){
        return {
            variables,
            varNames,
            headers,
            callbackPath
        }
    }else{
        throw new Error('Variables and Variable Names must be Specified Respectively.')
    }
}