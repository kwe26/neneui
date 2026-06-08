import express from "express"
import { Center, Column, CrossAxis, Empty, MainAxis, Scaffold, SingleChildScrollView, Text, TextStyle } from "./lib/widgets";
import { AppBar } from "./lib/base/appBar";
const app = express();

app.get("/ui/main", (req, res) => {
    const _scaffold = Scaffold("#scaffold", {
        appBar: AppBar("#appBarApp", {
            leading: Empty(),
            title: Text("#text", {
                text: "Hello World",
                style: TextStyle({})
            })
        }),
        body: SingleChildScrollView("#singleChildScrollView", {
            child: Column("#columnA", {
                mainAxisAlignment: MainAxis.center,
                crossAxisAlignment: CrossAxis.center,
                children: [
                    Center(
                        Text("#textA", {
                            text: `Math.Random() -> ${Math.random()}`,
                            style: TextStyle({
                                fontSize: 18
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