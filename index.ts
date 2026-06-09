import express from "express"
import { Center, Column, CrossAxis, EdgeInsets, Empty, MainAxis, Padding, Scaffold, Text, TextStyle, AppBar } from "./lib/widgets";
const app = express();

app.get("/ui/main", (req, res) => {
    const _scaffold = Scaffold("#scaffold", {
        appBar: AppBar("#appBarApp", {
            leading: Empty(),
            backgroundColor: '#c7d6ed',
            title: Text("#text", {
                text: "Hello World",
                style: TextStyle({ fontSize: 18 })
            })
        }),
        body: Padding("#paddingMain", {
            padding: EdgeInsets.all(12),
            child: Column("#columnA", {
                mainAxisAlignment: MainAxis.center,
                crossAxisAlignment: CrossAxis.center,
                children: [
                    Center(
                        Text("#textA", {
                            text: `Math.Random() -> ${Math.random()}`,
                            style: TextStyle({
                                fontSize: 18,
                                color: '#fc0352'
                            })
                        })
                    )
                ]
            })
        })
    });

    res.json(_scaffold)
});

app.listen(3500, () => console.log("The Server Running at http://0.0.0.0:3500"));