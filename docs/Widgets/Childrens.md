# Column

```js
import { Column, MainAxis, CrossAxis } from "neneui";

Column(id, {
    mainAxisAlignment: MainAxis.start, // Optional
    crossAxisAlignment: CrossAxis.start, // Optional
    foreach: false, // Optional
    children: Widget[]
})
```

# Row

```js
import { Row, MainAxis, CrossAxis } from "neneui";

Row(id, {
    mainAxisAlignment: MainAxis.start, // Optional
    crossAxisAlignment: CrossAxis.start, // Optional
    foreach: false, // Optional
    children: Widget[]
})
```

# Flex

```js
import { Flex, MainAxis, CrossAxis, TextDirection, Direction } from "neneui";

Flex(id, {
    children: Widget[],
    mainAxisAlignment: MainAxis.start,
    crossAxisAlignment: CrossAxis.start,
    spacing: 0,
    foreach: false, // Optional
    textDirection: TextDirection.ltr,
    direction: Direction.Vertical,
})
```

# SingleChildScrollView

```js
import { SingleChildScrollView } from "neneui";

SingleChildScrollView(id, {
    child: Empty(),
    physics: ScrollPhysics.Scroll, // Optional
    scrollDirection: Direction.Vertical, // Optional
    reverse: false // Optional
})
```