import { Alignment, Empty } from "../widgets";

export interface ChatBubbleProps {
    child: any,
    alignment?: Alignment,
    color?: any
}

export function ChatBubble(id: string, {
    child = Empty(),
    alignment = Alignment.topLeft,
    color = "#ffffff"
}: ChatBubbleProps) {
    return {
        id: "#chatBubble",
        name: "ChatBubble",
        props: {
            child,
            alignment,
            color
        }
    }
}