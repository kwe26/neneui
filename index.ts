import express from "express"
import { Center, Column, CrossAxis, EdgeInsets, Empty, MainAxis, Padding, Scaffold, Text, TextStyle, AppBar, Button, ButtonType, ButtonDensity, ButtonShape, DoAction, Action, CircularProgressIndicator, SizedBox, Row, Image, NetworkImage, BoxFit, ButtonGroup, Var, setVar, SingleChildScrollView, Avatar, AvatarBadge, CodeSnippet, BoxConstraints, TextField, TextEditingController, InputType, CheckBox, Compare, Iconify, NavigationBar, NavigationBarAlignment, NavigationLabelType, NavigationItem, NavigationRail, Alignment, NavigationLabelPosition, VerticalDivider, Frame } from "./lib/widgets";
import { readFileSync } from "node:fs"

const app = express();

app.get("/ui/main", async (req, res) => {
    const _scaffold = Scaffold("#scaffold", {
        appBar: AppBar("#appBarApp", {
            leading: Empty(),
            backgroundColor: '#c7d6ed',
            title: Text("#text", {
                text: "Hello World",
                style: TextStyle({ fontSize: 18 })
            })
        }),
        // bottom: NavigationBar('#navBar', {
        //     selectedKey: "0",
        //     alignment: NavigationBarAlignment.center,
        //     labelType: NavigationLabelType.none,
        //     expanded: true,
        //     children: [
        //         NavigationItem({
        //             label: "Home",
        //             key: 0,
        //             child: Iconify("home", {})
        //         }),
        //         NavigationItem({
        //             label: "Home 2",
        //             key: 1,
        //             child: Iconify("home", {})
        //         })
        //     ]
        // }),
        body: SingleChildScrollView('#singleChild', {
            child: Padding("#paddingMain", {
                padding: EdgeInsets.all(12),
                child: Column("#columnA", {
                    mainAxisAlignment: MainAxis.center,
                    crossAxisAlignment: CrossAxis.center,
                    children: [
                        Center(Text("#textAb", { text: `Math.random() -> ${Math.random()}`, style: TextStyle({}) })),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        Avatar('#avatarNene', {
                            backgroundColor: '#7711a0F',
                            badge: AvatarBadge({
                                size: 12,
                                child: Empty(),
                                color: "#09ff00"
                            }),
                            size: 64,
                            image: NetworkImage("https://i1.sndcdn.com/artworks-yKHnrEHNk6dPazfk-cvc2yA-t500x500.jpg")
                        }),
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
                        SizedBox("#sz2", { width: 10, height: 10 }),
                        Iconify('home', {}),
                        SizedBox("#sz2", { width: 10, height: 10 }),
                        TextField('#textF10', {
                            controller: TextEditingController({value: "Hey there nene, How are you?"}),
                            inputType: InputType.text
                        }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        CheckBox('#checkBoxState', {
                            trailing: Text("#textI", {
                                text: "Is Yashiro a Daikon?",
                            }),
                            value: false
                        }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        Center(Text("#textAb", {
                            text: Var({
                                template: "%1, Is Yashiro a Daikon? %2",
                                variable: "#textF10.controller,#checkBoxState.controller"
                            }), style: TextStyle({
                                fontSize: 20,
                            })
                        })),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        Compare({
                            fi: "#checkBoxState.controller",
                            ifEqualTo: "true",
                            then: Text("#OhYeah", {text: "Oh she is , you are right"}),
                            or:  Text("#NoWay", {text: "Noo, you are wrong!!!"}),
                        }),
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
                                            onPressed: DoAction(Action.SET_VAR, setVar({
                                                variable: 'default',
                                                value: "Nene is not"
                                            }))
                                        }),

                                        Button("#buttonVar", {
                                            child: Text("#textButton", {
                                                text: "Page Test",
                                                style: TextStyle({})
                                            }),
                                            leading: Empty(),
                                            type: ButtonType.Warning,
                                            density: ButtonDensity.comfortable,
                                            shape: ButtonShape.rectangle,
                                            disabled: false,
                                            onPressed: DoAction(Action.NAVIGATE, "/ui/nav_test")
                                        }),
                                    ]
                                })
                            ]
                        }),
                        SizedBox("#sz", { width: 10, height: 10 }),
                        CodeSnippet('#codeSnippet', {
                            code: await readFileSync("./index.ts",{encoding: 'utf8'}).toString(),
                            lang: "js",
                            constraints: BoxConstraints({
                                maxHeight: 700,
                                minWidth: 800,
                                minHeight: 200,
                                maxWidth: 800
                            }),
                            actions: []
                        })
                    ]
                })
            })
        })
    });

    res.json(_scaffold)
});

app.get("/ui/nav_test", async (req, res)  => {
    const _scaffold = Scaffold("#scaffold", {
        body: Row('#rowMain', {
            crossAxisAlignment: CrossAxis.stretch,
            children: [
                NavigationRail('#railNav', {
                    alignment: Alignment.topLeft,
                    labelType: NavigationLabelType.tootlip,
                    labelPosition: NavigationLabelPosition.bottom,
                    expanded: false,
                    children: [
                        NavigationItem({
                            key: 0,
                            label: "Home",
                            child: Iconify("home", {})
                        }),
                        NavigationItem({
                            key: 1,
                            label: "Profile",
                            child: Iconify("person", {})
                        })
                    ]
                }),
                VerticalDivider(),
                // Frame('#frame', {
                //     framePath: "/ui/main"
                // })
                // Column('#columnA', {
                //     mainAxisAlignment: MainAxis.start,
                //     crossAxisAlignment: CrossAxis.start,
                //     children: [
                //         Text("#textBar", {text: "Other Side"})
                //     ]
                // })
            ]
        })
    });

    res.json(_scaffold);
});

app.listen(3500, () => console.log("The Server Running at http://0.0.0.0:3500"));