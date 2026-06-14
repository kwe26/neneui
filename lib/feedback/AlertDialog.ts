import { Empty } from "../empty_shell";

export interface AlertDialogProps{
    leading?: any,
    title? : any,
    content: any,
    actions: any[],
    barrierDismissible?: boolean
}

export function AlertDialog({
    leading = Empty(),
    title = Empty(),
    content = Empty(),
    actions = [Empty()],
    barrierDismissible = true
}: AlertDialogProps){
    return {
        id: "#AlertDialog_",
        name: "AlertDialog",
        props: {
            leading,
            title,
            content,
            actions,
            barrierDismissible
        }
    }
}