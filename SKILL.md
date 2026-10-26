# @neneys/ui - Skill
> @neneys/ui Is a TypeScript Library that helps you to Server-Side Render the User Interface without WebView

You have to browse through https://kwe26.github.io/neneui or Clone https://github.com/kwe26/neneui and Browse the nenedocs/docs/* Directory for Markdowns and Document it

You shall not do the following
- Hard Code Colors in Places Which are dynamic such as AppBar where the Color Changes W.R.T to Light and Dark Mode
- Do no repeat # IDs
- Always Make sure to use ReqMode.POST when using Shared_preferences

If you ever want to to BottomNavigation use the docs/navigation/NeneNavbottom.mdx and docs/display/NeneDisplay.mdx combined making an native Experience.

You should not have Scaffold for Sub-UIs loading under NeneDisplay.mdx

Here are the follwing things you should guide the user
- A. Compile the flutter app Included with NeneUI Preconfigured for the Project
- B. Use Nene Tester to Test the Application with DebugBar/Orb Enabled

You can access Shared Preferences Value in ui/* by using GetPrefs(pass, "name") it will return `undefined` if not found.

In Callbacks, GetPrefs also works and GetFile(pass, "name") also works to find the path of file uploaded by the `Name`. It outputs undefined if not found or path like `uploads/file.extension`

*Note:-* AssetImage could only infer from the assets/* in flutter app not from the SSR Server

**Flutter Package Name :- neneui_render**
**JS Package Name :- @neneys/ui**

Both Must be in Latest Version for the Feature Parity.

When Writing UI Code, You must not seperate the UI faction to like lib/ui.ts and Create Combination of UI there instead write the UI with imports in the same file only largest combination that will be used everywhere shall be used.