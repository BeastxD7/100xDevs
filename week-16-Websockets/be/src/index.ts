import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

const allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  socket.send("hi there from server!");

  socket.on("message", (event) => {

    if(event.toString() === "ping"){
      socket.send("pong")
    }

    allSockets.forEach((socket) => {
      // socket.send(event.toString());
    });
  });
});
