
import type { WebSocket } from "ws";
import type { IncomingMessage } from "node:http";
import { GetPrefs, SendWidget, Text } from "../lib/widgets";

export const path = "/home";

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
                "Connection: ACTIVE",
                "",
                "Send a message from the client to test communication.",
            ].join("\n"),
        })
    );

    // 2. Receive messages from the Flutter client
    socket.on("message", (message) => {
        messagesReceived++;

        const pass = JSON.parse(message.toString())['data'];

        console.log(GetPrefs(pass, "hello"))

        const content = message.toString();

        console.log(`[NeneUI WS] Received: ${content}`);

        SendWidget(
            socket,
            Text("#wsEcho", {
                text: [
                    "Message received by server!",
                    `Content: ${content}`,
                    `Messages received: ${messagesReceived}`,
                    `Server time: ${new Date().toLocaleTimeString()}`,
                ].join("\n"),
            })
        );
    });

    // 3. Periodically prove that the connection is still alive
    const heartbeat = setInterval(() => {
        if (socket.readyState !== socket.OPEN) {
            clearInterval(heartbeat);
            return;
        }

        const uptimeSeconds = Math.floor((Date.now() - startedAt) / 1000);

        SendWidget(
            socket,
            Text("#wsHeartbeat", {
                text: `Heartbeat: ${new Date().toLocaleTimeString()} | Server uptime: ${uptimeSeconds}s`,
            })
        );
    }, 5000);

    // 4. Clean up when the client disconnects
    socket.on("close", () => {
        clearInterval(heartbeat);
        console.log("[NeneUI WS] Client disconnected.");
    });

    socket.on("error", (error) => {
        clearInterval(heartbeat);
        console.error("[NeneUI WS] Socket error:", error);
    });

    console.log(`[NeneUI WS] Client connected at ${new Date().toISOString()}`);
}
