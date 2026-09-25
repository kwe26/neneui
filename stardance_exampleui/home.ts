import type { Request, Response } from "express";
import { Action, AppBar, Avatar, AvatarBadge, BoxFit, Breadcrumb, BreadcrumbSeparator, Button, ButtonType, Card, Center, Colors, Column, CrossAxis, DatePicker, DoAction, EdgeInsets, Empty, FormSubmitAction, Frame, Iconify, Image, InputOTP, InputOTPChild, InputType, LaunchURL, MainAxis, MemoryImage, NavigationBar, NavigationBarAlignment, NavigationItem, NavigationLabelType, NetworkImage, Padding, PromptMode, Row, Scaffold, SelectFile, setVar, SingleChildScrollView, SizedBox, Text, TextAlign, TextEditingController, TextField, TextStyle, Var, VideoPlugin } from "../lib/widgets";
import { DateTime } from "../lib/core/DateTime";
import { ForEach } from "../lib/core/ForEach";

export const path = "/ui/main"
export async function run(req: Request, res: Response, pass: any) {
    // let stardanceApiProjects = await fetch('https://stardance.hackclub.com/api/v1/projects', {
    //     headers: {
    //         Authorization: 'Bearer '+process.env['STARDANCE_KEY']
    //     }
    // });

    //let projects = await stardanceApiProjects.body?.json();

    let projects = {
  projects: [
    {
      id: 65475,
      title: "it's a bloody hackpad",
      description: "",
      ship_status: "draft",
      repo_url: "",
      demo_url: "",
      readme_url: "",
      ai_declaration: "",
      created_at: "2026-09-24T16:26:51.131Z",
      updated_at: "2026-09-24T16:28:07.849Z",
      devlog_ids: [ 61298 ],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65474,
      title: "esp 32 ai robot",
      description: "an ai powered robot that uses esp32 with an ai chat bot, a ai thinker esp 32 cam with a object and human detection and a 3.5\" lcd screen with hand drawn animations",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:24:15.056Z",
      updated_at: "2026-09-24T16:24:15.227Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65473,
      title: "WebOS 1",
      description: "This is my very own OS that can be run in the web!",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:20:50.830Z",
      updated_at: "2026-09-24T16:20:50.926Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65472,
      title: "Untitled project",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:18:33.785Z",
      updated_at: "2026-09-24T16:18:33.785Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65471,
      title: "stud.io",
      description: "ai assisted studing tool",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:17:25.491Z",
      updated_at: "2026-09-24T16:17:25.536Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65470,
      title: "WarioWare Game",
      description: "A game full of short minigames! (Make a WarioWare-Style Game Mission)",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:17:02.884Z",
      updated_at: "2026-09-24T16:17:02.969Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65469,
      title: "Hackpad",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:16:54.909Z",
      updated_at: "2026-09-24T16:16:54.965Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65468,
      title: "spoon stbilizer",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:16:36.640Z",
      updated_at: "2026-09-24T16:16:36.640Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65467,
      title: "WarioWare Game",
      description: "A game full of short minigames! (Make a WarioWare-Style Game Mission)",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:11:07.763Z",
      updated_at: "2026-09-24T16:11:07.888Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65466,
      title: "Frictionless",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:06:30.062Z",
      updated_at: "2026-09-24T16:06:34.156Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65465,
      title: "legion bot",
      description: "This bot isn't slacking off, it replies to messages 24/7!",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:04:05.544Z",
      updated_at: "2026-09-24T16:04:05.607Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65464,
      title: "mine only",
      description: "im gonna fetch all nasa's data mwahaha...",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T16:00:30.106Z",
      updated_at: "2026-09-24T16:00:30.159Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65463,
      title: "my first personal website",
      description: "It's very personal to me :D",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:56:46.325Z",
      updated_at: "2026-09-24T15:56:46.402Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65461,
      title: "My very own WebOS",
      description: "This is my very own OS that can be run in the web!",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:53:34.565Z",
      updated_at: "2026-09-24T15:53:34.629Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65460,
      title: "My own site!",
      description: "It's very personal to me :D",
      ship_status: "draft",
      repo_url: "",
      demo_url: "",
      readme_url: "",
      ai_declaration: "None",
      created_at: "2026-09-24T15:51:06.044Z",
      updated_at: "2026-09-24T16:04:41.252Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65459,
      title: "StellarForge",
      description: "A live UI design system playground — tweak colors, type, spacing, and components in real time, then export the tokens.",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:48:51.842Z",
      updated_at: "2026-09-24T15:48:51.898Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65458,
      title: "Escape The Dungeon",
      description: "A text-based RPG using Python!",
      ship_status: "draft",
      repo_url: "https://github.com/Mian-Ismail-Shahbaz-Ali/escape-the-dungeon",
      demo_url: "",
      readme_url: "https://raw.githubusercontent.com/Mian-Ismail-Shahbaz-Ali/escape-the-dungeon/main/README.md",
      ai_declaration: "I used AI to get guidance when I needed help. I also used it to make my plan/schedule.",
      created_at: "2026-09-24T15:44:03.980Z",
      updated_at: "2026-09-24T16:07:02.654Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65457,
      title: "Frictionless",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:41:44.372Z",
      updated_at: "2026-09-24T15:41:44.433Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65456,
      title: "Game",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:40:48.307Z",
      updated_at: "2026-09-24T15:40:48.361Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65455,
      title: "Literally random bot",
      description: "Believe it or not, this bot, gives you a random number",
      ship_status: "draft",
      repo_url: "",
      demo_url: "",
      readme_url: "",
      ai_declaration: "",
      created_at: "2026-09-24T15:33:33.582Z",
      updated_at: "2026-09-24T15:47:45.403Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65454,
      title: "Touch Grass Simulator",
      description: "",
      ship_status: "draft",
      repo_url: "",
      demo_url: "",
      readme_url: "",
      ai_declaration: "",
      created_at: "2026-09-24T15:30:58.158Z",
      updated_at: "2026-09-24T15:31:20.448Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65453,
      title: "MySite[II^2]",
      description: "im gonna fetch all nasa's data mwahaha...",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:30:24.504Z",
      updated_at: "2026-09-24T15:30:24.568Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65452,
      title: "rental car company",
      description: "database system for rental car companies",
      ship_status: "draft",
      repo_url: "",
      demo_url: "",
      readme_url: "",
      ai_declaration: "None",
      created_at: "2026-09-24T15:25:40.853Z",
      updated_at: "2026-09-24T15:26:21.863Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65451,
      title: "Improving my Personal Website",
      description: "im gonna fetch all nasa's data mwahaha...",
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:16:15.534Z",
      updated_at: "2026-09-24T15:16:15.619Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }, {
      id: 65450,
      title: "My awesome macropad!",
      description: null,
      ship_status: "draft",
      repo_url: null,
      demo_url: null,
      readme_url: null,
      ai_declaration: null,
      created_at: "2026-09-24T15:09:38.402Z",
      updated_at: "2026-09-24T15:09:38.657Z",
      devlog_ids: [],
      banner_url: null,
      banner_thumb_url: null,
    }
  ],
  pagination: {
    current_page: 1,
    total_pages: 2266,
    total_count: 56649,
    next_page: 2,
  },
};
    
    var projectWidgets = [];

    for(var proj of projects.projects) {
        projectWidgets.push(
            Padding('#padingCard' + proj['id'], {
                padding: EdgeInsets.all(2),
                child : SizedBox('#szBox'+proj['id'], 
                {
                    width: 1000,
                    height: 200,
                    child: Card('#projCard' + proj['id'], {
                        color: Colors.white,
                        child: Padding('#paddingCard' + proj['id'], {
                            padding: EdgeInsets.all(9),
                            child: Column(
                                'coluCard' + proj['id'],
                                {
                                    mainAxisAlignment: MainAxis.start,
                                    crossAxisAlignment: CrossAxis.start,
                                    children: [
                                        Text("#textId"+ proj['id'], {
                                            text: proj['title'],
                                            align: TextAlign.left,
                                            style: TextStyle({
                                                fontSize: 21,
                                            })
                                        }),
                                        Text("#textId"+ proj['id'], {
                                            text: proj['description'] !== null ?  proj['description'] : "",
                                            align: TextAlign.left,
                                            style: TextStyle({
                                                fontSize: 8
                                            })
                                        })
                                    ]
                                }
                            )
                        })
                    })
                })
            })
        );
    }

    let _scf = Scaffold('#mainScaffold', {
        appBar: AppBar('#appBar', {
            leading: Iconify('star', { color: Colors.white }),
            title: Text("#txt", {text: "Stardance", style: TextStyle({color: Colors.white})})
        }),

        body: SingleChildScrollView('#schView', {
            child: Padding('#padding', {
                padding: EdgeInsets.all(8),
                child: Column('#columnMain', {
                  mainAxisAlignment: MainAxis.start,
                  crossAxisAlignment: CrossAxis.start,
                  children: projectWidgets
                })
            })
        }),
    });

    res.json(_scf);
}