"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    socket.send("hi there!");
    socket.on("message", (event) => {
        allSockets.forEach((socket) => {
            socket.send(event.toString());
        });
    });
});
