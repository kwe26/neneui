# Accordion

```ts
import { Accordion } from "@neneys/ui"

Accordion('#id', {
    items: [
        AccordionItems...
    ]
})
```

# AccordionTrigger

```ts
import { AccordionTrigger } from "@neneys/ui"

AccordionTrigger(child)
```

# AccordionItem

```ts
AccordionItem(id, {
    trigger: AccordionTrigger(child),
    content: Text(id, {text: "Hi"}),
    expanded: true
})
```

# AvatarBadge

```ts
import { AvatarBadge } from "@neneys/ui"

AvatarBadge({
    size: 12,
    child: ...,
    color: "#HEX"
})
```

# Avatar

```ts
import { Avatar } from "@neneys/ui"

Avatar({
    backgroundColor: "#000000",
    initials: "Avatar",
    size: 32,
    badge: AvatarBadge({}),
    image: AssetImage('')
})
```

# Alignment

```ts
export enum Alignment {
    bottomCenter = "bottomCenter",
    bottomLeft = "bottomLeft",
    bottomRight = "bottomRight",
    center = "center",
    centerLeft = "centerLeft",
    centerRight = "centerRight",
    topCenter = "topCenter",
    topLeft = "topLeft",
    topRight = "topRight"
}
```

# ChatBubble

```ts
import { ChatBubble, Alignment } from "@neneys/ui";

ChatBubble(id, {
    child: ..,
    alignment: Alignment.topLeft...,
    color: "#HEX"
})
```

# ChatBubbleType

```ts
export enum ChatBubbleType {
    plain = "plain",
    sharpCorner = "sharpCorner",
    tail = "tail"
}
```

# AxisAlignmentDirectional

```ts
export enum AxisAlignmentDirectional {
    center = "center",
    end = "end",
    start = "start"
}
```

# ChatGroup

```ts
import { ChatGroup } from "@neneys/ui"

ChatGroup(id, {
    children:[],
    alignment: AxisAlignmentDirectional.start,
    color: "#7700ff",
    type: ChatBubbleType.sharpCorner,
    borderRadius: 10,
    avatarPrefix: Avatar('#avatar', { initials: "AR" }) 
})
```
# CodeSnippet 

```ts
import { CodeSnippet, BoxConstraints } from "@neneys/ui";

CodeSnippet({
    code: `print('Hello World')`,
    lang: "dart",
    constraints: BoxConstraints({}),
    actions: []
})
```

# Skeleton

```ts
import { Skeleton } from "@neneys/ui"

Skeleton(id, child)
```

# FixedTableSize

```ts
import { FixedTableSize } from "@neneys/ui"

FixedTableSize(10)
```

# FlexTableSize

```ts
import { FlexTableSize } from "@neneys/ui"

FlexTableSize(flex, fit)
```

# TableCell

```ts
import { TableCell } from "@neneys/ui";

TableCell(id, {
    columnSpan: 1,
    rowSpan: 1,
    child: Empty(),
    rowHover: true,
    backgroundColor: "#HEXCODE"
})
```

# TableFooter

```ts
import { TableFooter } from "@neneys/ui";

TableFooter(id, {
    cells: [..]
})
```

# TableRow

```ts
import { TableRow } from "@neneys/ui"

TableRow(id, {
    cells: [],
    selected: false,  
})
```

# Table

```ts
import { Table } from "@neneys/ui"

Table(id, {
    rows: [],
    defaultColumnWidth: FixedTableSize(10),
    foreach: false,
    columnWidths: {
        1: 1
    }
})
```