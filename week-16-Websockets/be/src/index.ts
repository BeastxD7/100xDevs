import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  socket.send("hi there!");

  socket.on("message", (event) => {
    allSockets.forEach((socket) => {
      socket.send(event.toString());
    });
  });
});
