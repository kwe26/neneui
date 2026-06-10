import express from "express"
import { Center, Column, CrossAxis, EdgeInsets, Empty, MainAxis, Padding, Scaffold, Text, TextStyle, AppBar, Button, ButtonType, ButtonDensity, ButtonShape, DoAction, Action, CircularProgressIndicator, SizedBox, Row, Image, NetworkImage, BoxFit, ButtonGroup } from "./lib/widgets";
import { Var } from "./lib/core/Variable";
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
                    Image('#imageTest', {
                        path: NetworkImage("https://pbs.twimg.com/profile_images/1371906433172844546/YD9zBd3G.jpg"),
                        width: 200,
                        fit: BoxFit.contain,
                        height: 200
                    }),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    Image('#imageTest', {
                        path: NetworkImage("https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"),
                        width: 200,
                        fit: BoxFit.contain,
                        height: 200
                    }),
                    SizedBox("#sz", { width: 10, height: 10 }),
                    Center(Text("#textAb", { text: Var({
                        template: "Hello,%1%2",
                        variable: "default,defaultb"
                    }), style: TextStyle({
                        fontSize: 20
                    }) })),
                    SizedBox("#sz2", { width: 10, height: 10 }),
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
                            ButtonGroup('#bGroup', {
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

                                    Button("#buttonDaikonDebug", {
                                        child: Text("#textButton", {
                                            text: "DaikonDebug",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Success,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.DEBUG, "1234")
                                    }),

                                    Button("#buttonVar", {
                                        child: Text("#textButton", {
                                            text: "SetVar",
                                            style: TextStyle({})
                                        }),
                                        leading: Empty(),
                                        type: ButtonType.Success,
                                        density: ButtonDensity.comfortable,
                                        shape: ButtonShape.rectangle,
                                        disabled: false,
                                        onPressed: DoAction(Action.SET_VAR, {'var': 'default' ,val: 'Nene is not '})
                                    }),
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });

    res.json(_scaffold)
});

app.listen(3500, () => console.log("The Server Running at http://0.0.0.0:3500"));