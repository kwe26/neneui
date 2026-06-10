export interface VariableProps{
    template: string,
    variable: string
}

export function Var({
    template = "Hello {%1} {%2}",
    variable = "default,defaultb"
}: VariableProps){
    return {
        template,
        variable
    };
}