import express from "express"
import { Center, Column, CrossAxis, EdgeInsets, Empty, MainAxis, Padding, Scaffold, Text, TextStyle, AppBar, Button, ButtonType, ButtonDensity, ButtonShape, DoAction, Action, CircularProgressIndicator, SizedBox, Row } from "./lib/widgets";
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
                    Center(Text("#textAb", { text: `Math.random() -> ${Math.random()}`, style: TextStyle({}) })),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    Button("#buttonAA", {
                        child: Text("#textButton", {
                            text: "Button Click",
                            style: TextStyle({})
                        }),
                        leading: Empty(),
                        type: ButtonType.Danger,
                        density: ButtonDensity.comfortable,
                        shape: ButtonShape.rectangle,
                        disabled: false,
                        onPressed: DoAction(Action.SHOW_TOAST, "Hello World")
                    }),
                    SizedBox("#sz2", { width: 10, height: 10 }),
                    Row('#rowA', {
                        mainAxisAlignment: MainAxis.center,
                        crossAxisAlignment: CrossAxis.center,
                        children: [
                            Button("#buttonHideAppBar", {
                                child: Text("#textButton", {
                                    text: "Hide AppBar",
                                    style: TextStyle({})
                                }),
                                leading: Empty(),
                                type: ButtonType.Danger,
                                density: ButtonDensity.comfortable,
                                shape: ButtonShape.rectangle,
                                disabled: false,
                                onPressed: DoAction(Action.HIDE, "#appBarApp")
                            }),

                            Button("#buttonShowAppBar", {
                                child: Text("#textButton", {
                                    text: "Show AppBar",
                                    style: TextStyle({})
                                }),
                                leading: Empty(),
                                type: ButtonType.Secondary,
                                density: ButtonDensity.comfortable,
                                shape: ButtonShape.rectangle,
                                disabled: false,
                                onPressed: DoAction(Action.SHOW, "#appBarApp")
                            }),
                        ]
                    })
                ]
            })
        })
    });

    res.json(_scaffold)
});

app.listen(3500, () => console.log("The Server Running at http://0.0.0.0:3500"));