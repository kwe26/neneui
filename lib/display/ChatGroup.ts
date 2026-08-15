import { Avatar, AxisAlignmentDirectional, ChatBubbleType } from "../widgets";

export interface ChatGroupProps {
    children: any[],
    alignment: AxisAlignmentDirectional,
    color: string,
    type: ChatBubbleType,
    borderRadius?: any,
    avatarPrefix?: any
}

export function ChatGroup(id: string, {
    children = [],
    alignment = AxisAlignmentDirectional.start,
    color = "#7700ff",
    type = ChatBubbleType.sharpCorner,
    borderRadius = 10,
    avatarPrefix = Avatar('#avatar', { initials: "AR" })
}: ChatGroupProps){
    return {
        id,
        name: "ChatGroup",
        props: {
            children,
            alignment,
            color,
            type,
            borderRadius,
            avatarPrefix
        }
    }
}