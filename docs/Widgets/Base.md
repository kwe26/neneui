# Scaffold
```js
import { Scaffold } from "neneui";

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
import { Center } from "neneui";

Center(Widget)
```

# Divider
```js
import { Divider, VerticalDivider } from "neneui";

Divider()

VerticalDivider()
```

# Expanded

```js
import { Expanded } from "neneui";

Expanded(id, {
    child: Widget,
    flex: double
})
```

# SizedBox

```js
import { SizedBox } from "neneui";

SizedBox(id, {
    width: double, // Optional
    height: double, // Optional
    child: Widget // Optional
})
```

# Padding

```js
import { Padding, EdgeInsets } from "neneui";

Padding(id, {
    padding: EdgeInsets.all(1), // Optional
    child: Widget
})
```

# Container

```js
import { Container } from "neneui";

Container(id, {
    child: Widget, // Optional
    decoration: BoxDecoration // Optional
})
```

# AppBar

```js
import { AppBar } from "neneui";

AppBar(id, {
    leading: Widget, // Optional
    title: Widget,
    actions: Widget[], // Optional
    backgroundColor: "HexColorCode" // Optional
})
```