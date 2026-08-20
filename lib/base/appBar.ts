import { Empty } from "../empty_shell";
import { Text, TextStyle } from "../widgets";

export interface AppBarProps {
    leading?: any,
    title?: any,
    actions?: any[],
    backgroundColor?: string,
}

export function AppBar(id: string, {
    leading = Empty(),
    title = Text("#idtext_df", { text: "AppBar", style: TextStyle({}) }),
    actions = [],
    backgroundColor = "#DEFAULT"
}: AppBarProps){
    return {
        id,
        name: "AppBar",
        props: {
            leading,
            title,
            actions,
            backgroundColor
        }
    }
}