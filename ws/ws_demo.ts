
import type { WebSocket } from "ws";
import type { IncomingMessage } from "node:http";
import { GetPrefs, SendWidget, Text } from "../lib/widgets";

export const path = "/hfome";

export function run(
    socket: WebSocket,
    req: IncomingMessage,
    pass: any,
    params: Record<string, string>
) {
    const startedAt = Date.now();
    let messagesReceived = 0;

    const sendStatus = (status: string) => {
        SendWidget(
            socket,
            Text("#wsStatus", {
                text: `>>> NeneUI WebSocket: ${status}`,
            })
        );
    };


    sendStatus("Connected successfully!");

    SendWidget(
        socket,
        Text("#wsInfo", {
            text: [
                `Server date: ${new Date().toLocaleString()}`,
                `Endpoint: ${path}`,
                "Connection: ACTIVE"
            ].join("\n"),
        })
    );

    // 2. Receive messages from the Flutter client
    socket.on("message", (message) => {
        messagesReceived++;

        const pass = JSON.parse(message.toString())['data'];

        console.log(GetPrefs(pass, "hello"))

        // Pass Contains what was recived via Form as well
    });

    SendWidget(
        socket,
        Text("#wsHeartbeat", {
            text: `Heartbeat: ${new Date().toLocaleTimeString()}`,
        })
    );

    // 4. Clean up when the client disconnects
    socket.on("close", () => {
        console.log("[NeneUI WS] Client disconnected.");
    });

    socket.on("error", (error) => {
        console.error("[NeneUI WS] Socket error:", error);
    });

    console.log(`[NeneUI WS] Client connected at ${new Date().toISOString()}`);
}
