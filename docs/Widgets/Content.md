# Card

```js
import { Card, EdgeInsets } from "neneui";

Card(id, {
    child: Widget,
    padding: EdgeInsets.all(10), // Optional
    color: "HEX CODE", // Optional
    type: "filled" // Optional
})
```

# Image

```js
import { Image, AssetImage, ImageRepeat, BoxFit, Alignment, FilterQuality, CircularProgressIndicator, SizedBox } from "neneui";

Image(id, {
    path: AssetImage(""),
    width: 0, // Optional
    height: 0, // Optional
    scale: 1.0, // Optional
    color: "#000000", // Optional
    repeat: ImageRepeat.noRepeat, // Optional
    fit: BoxFit.none, // Optional
    alignment: Alignment.center, // Optional
    filterQuality: FilterQuality.none, // Optional
    loadingWidget: CircularProgressIndicator('#fImageLoading', {}), // Optional
    errorWidget: SizedBox('#fImageError', {}) // Optional
})
```

# TextDecoration
TextDecoration = none, lineThrough, overline, underline

# FontWeight
FontWeight = bold, w100, w200, w300, w400, w500, w600, w700, w800, w900

# TextStyle

```js
import { TextStyle } from "neneui";

TextStyle({
    height: float, // Optional
    fontSize: float, // Optional
    fontWeight: FontWeight.bold, // Optional
    color: hex, // Optional
    decoration: TextDecoration.bold, // Optional
    fontStyle: FontStyle.normal,italic // Optional
})
```

# TextAlign
TextAlign = left, right, center, justify, start, end

# TextOverflow
TextOverflow = clip, fade, ellipsis, visible

# Text

```ts
import { Text, TextStyle, TextOverflow } from "neneui";

Text(id, {
    text: "string",
    align: TextAlign.center, //optional,
    overflow: TextOverflow.clip, //optional
    style: TextStyle // Optional
})
```

