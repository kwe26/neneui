import { Empty } from "../empty_shell";
import { AssetImage } from "../widgets";

export interface AvatarProps {
    backgroundColor?: string,
    initials?: string,
    size?: number,
    badge?: any,
    image?: string | any
}

export function Avatar(id: string, {
    backgroundColor = "#000000",
    initials = "Avatar",
    size = 32,
    badge = AvatarBadge({}),
    image = AssetImage('')
}: AvatarProps){
    return {
        id,
        name: "Avatar",
        props: {
            backgroundColor,
            initials,
            size,
            badge,
            image
        }
    }
}

export interface AvatarBadgeProps{
    size?: number,
    child?: any,
    color?: string
}

export function AvatarBadge({
    size = 1,
    child = Empty(),
    color = "#329e00"
}: AvatarBadgeProps){
    return {
        id: "#avatarBadge",
        name: "AvatarBadge",
        props: {
            size,
            color,
            child
        }
    }
}