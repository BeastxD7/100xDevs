import React, { createContext, useState, useEffect } from "react";

export const SocketContext = createContext<{
  socket: WebSocket | null;
  connectWebSocket: (roomId: string) => void;
} | null>(null);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const connectWebSocket = (roomId: string) => {
    const newSocket = new WebSocket("ws://localhost:8080");
  
    newSocket.onopen = () => {
      console.log("WebSocket connection opened!");
      newSocket.send(JSON.stringify({ type: "join", payload: { roomId } }));
    };
  
    newSocket.onmessage = (event) => {
      console.log("Message from server: ", event.data);
    };
  
    newSocket.onclose = () => {
      console.log("WebSocket connection closed!");
      setSocket(null); // Clean up the socket
    };
  
    setSocket(newSocket);
  };
  

  useEffect(() => {
    return () => {
      socket?.close(); // Clean up when unmounting
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, connectWebSocket }}>
      {children}
    </SocketContext.Provider>
  );
};
