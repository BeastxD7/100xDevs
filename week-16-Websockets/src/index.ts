import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 3000 });

const allSockets = [];

wss.on("connection", (socket) => {
  allSockets.push(socket);

  socket.send("hi there!");

  socket.on("message", (event) => {
    console.log(
      "Here is the message from " + socket + " : " + event.toString()
    );
  });
});
