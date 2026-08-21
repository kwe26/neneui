# Scaffold
```js
import { Scaffold } from "@neneys/ui";

return Scaffold(id, {
    appBar: Widget, // Optional
    body: Widget,
    drawer: Widget, // Optional
    preActions: DoAction[], // Optional
    floatingActionButton: Widget, // Optional
    backgroundColor: "HEXCODE", // Optional
    bottom: Widget, // Optional
    floatingActionButtonLocation: floatingActionButtonLocation // Optional
});
```

# Center
```js
import { Center } from "@neneys/ui";

Center(Widget)
```

# Divider
```js
import { Divider, VerticalDivider } from "@neneys/ui";

Divider()

VerticalDivider()
```

# Expanded

```js
import { Expanded } from "@neneys/ui";

Expanded(id, {
    child: Widget,
    flex: double
})
```

# SizedBox

```js
import { SizedBox } from "@neneys/ui";

SizedBox(id, {
    width: double, // Optional
    height: double, // Optional
    child: Widget // Optional
})
```

# Padding

```js
import { Padding, EdgeInsets } from "@neneys/ui";

Padding(id, {
    padding: EdgeInsets.all(1), // Optional
    child: Widget
})
```

# Container

```js
import { Container } from "@neneys/ui";

Container(id, {
    child: Widget, // Optional
    decoration: BoxDecoration // Optional
})
```

# AppBar

```js
import { AppBar } from "@neneys/ui";

AppBar(id, {
    leading: Widget, // Optional
    title: Widget,
    actions: Widget[], // Optional
    backgroundColor: "HexColorCode" // Optional
})
```