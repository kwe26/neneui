export interface NewPropsProps{
    id: string,
    props: any
}

export function NewProps({
    id,
    props
}: NewPropsProps) {
    return {
        id,
        props: props.props
    }
}