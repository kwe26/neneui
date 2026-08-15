export interface AccordionProps {
    items: any[]
}

export function Accordion(id: string, {
    items
}: AccordionProps) {
    return {
        id,
        name: "Accordion",
        props: {
            items
        }
    };
}


export function AccordionTrigger(child : any) {
    return {
        id: "#ACCORDTION_TWITER",
        name: "AccordtionTrigger",
        props: {
            child
        }
    };
}

export interface AccordionItemProps {
    trigger: any,
    content: any,
    expanded?: boolean
}

export function AccordionItem(id: string, {
    trigger,
    content,
    expanded = true
}: AccordionItemProps){
    return {
        id,
        name: "AccordionItem",
        props:{
            trigger,
            content,
            expanded
        }
    };
}