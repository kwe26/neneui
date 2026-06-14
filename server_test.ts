import { NeneServer } from "./lib/widgets";

NeneServer({
    port: 3500,
    uiPath: "./example_ui",
    verbose: true,
    callbackPath: "./example_callback"
})