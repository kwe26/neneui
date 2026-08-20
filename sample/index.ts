import { NeneServer } from "@neneys/ui";

NeneServer({
    port: 3500,
    uiPath: "./example_ui",
    verbose: true,
    callbackPath: "./example_callback"
})