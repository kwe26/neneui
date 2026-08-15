# Functions and Coreutils

# Actions
- SHOW_TOAST
- NAVIGATE
- NAVIGATE_PUSH_REPLACE
- NAVIGATE_POP
- HIDE
- SHOW
- DEBUG
- DIALOG
- SUBMIT
- SET_VAR
- JAVASCRIPT
- PROPS
- LAUNCH_URL
- SELECT_FILE

# BoxConstraints
```js
import { BoxConstraints } from "neneui";

BoxConstraints({
    minHeight: 0.0, // Required All
    maxHeight: Infinity,
    minWidth: 0.0,
    maxWidth: Infinity
})
```

# AssetImage, NetworkImage

```ts
import { NetworkImage, AssetImage } from "neneui";

AssetImage("assets/image.png") // Only if inside flutter or renderer's path
NetworkImage("<HTTP URL>")
```

# BoxDecoration

```js
import { BoxDecoration } from "neneui";

BoxDecoration({
    color :"#FFFFFF",
    image: AssetImage, NetworkImage,
    radius: 1,
    borderColor: "#FFFFFF",
    borderWidth: 1
})
```

# Compare

```js
import { Compare } from "neneui";

Compare({
    fi: "var_name",
    ifEqualTo: "hello",
    then: Widget,
    or: Widget
})
```
