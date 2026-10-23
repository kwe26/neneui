import { NeneServer, ReqType } from "@neneys/ui";

NeneServer({
    port: 3500,
    uiPath: "./example_ui",
    verbose: true,
    reqType: ReqType.POST,
    callbackPath: "./example_callback"
})