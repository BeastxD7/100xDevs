let socket:WebSocket | null = null;

export const connectWebSocket = (roomId:string) => {

    socket = new WebSocket("ws://localhost:8080");
    
    socket.onopen = (event) => {
        console.log("WebSocket connection opened!");
        socket?.send(JSON.stringify({type:"join" , payload: {roomId} }))
      };
    
    socket.onmessage = (event) => {
      alert("Message from server: " + event.data);
    };

    socket.onclose = () => {
        console.log("WebSocket connection closed!");
        socket = null; 
      };

}