"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allSockets = [];
wss.on("connection", (socket) => {
    allSockets.push(socket);
    socket.on("message", (message) => {
        allSockets.forEach((socket) => {
            socket.send("message: " + message);
        });
    });
});
