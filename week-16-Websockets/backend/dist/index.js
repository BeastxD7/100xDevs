"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const allSockets = [];
wss.on("connection", (socket) => {
    try {
        socket.on("message", (message) => {
            const parsedmessage = JSON.parse(message.toString());
            console.log(parsedmessage);
            if (parsedmessage.type == "join") {
                allSockets.push({
                    roomId: parsedmessage.payload.roomId,
                    socket,
                });
                socket.send("room joined: " + parsedmessage.payload.roomId);
            }
            let currentRoomId;
            if (parsedmessage.type == "chat") {
                const parsedmessage = JSON.parse(message.toString());
                console.log(parsedmessage.payload.message);
                if (parsedmessage.type == "chat") {
                    for (let i = 0; i < allSockets.length; i++) {
                        if (allSockets[i].socket == socket) {
                            currentRoomId = allSockets[i].roomId;
                        }
                    }
                }
            }
            for (let i = 0; i < allSockets.length; i++) {
                if (allSockets[i].roomId === currentRoomId) {
                    allSockets[i].socket.send(parsedmessage.payload.message);
                }
            }
        });
    }
    catch (error) {
        socket.send(error);
    }
});
