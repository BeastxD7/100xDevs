import { useEffect, useRef, useState } from "react";



const App = () => {
  const [socket, setSocket]  = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null)
  let roomId:string | null = null;
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080"); 
    ws.onmessage = (event) => {
      alert("Message from server: " + event.data);
    };
    setSocket(ws)
  }, []);

  const joinBtn = () => {
    if(inputRef.current){
      roomId = inputRef.current.value;
      console.log(inputRef.current.value);
      
    }
    if(socket) {
      if(roomId?.length == 0) {
        alert("Enter RoomId to Join!");
        return;
      }
      socket.send(`{"type":"join", "payload": {"roomId":"${roomId}"}}`)
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center flex-col">
      <h1
        className="
    text-white text-xl text-center py-4 font-semibold">
        Chat Room
      </h1>
      <div className="w-1/2 h-1/2 bg-zinc-500 rounded-xl bg-opacity-30 flex flex-col items-center ">
        <div className="flex flex-col gap-3 justify-center items-center h-full">
          <button className="py-2 px-4 w-64 bg-blue-600 text-white rounded-lg">
            Create Room
          </button>
          <input ref={inputRef}
            className="py-2 bg-zinc-500 w-64 text-white text-lg outline-none rounded-lg px-2"
            placeholder="Room ID"
            type="text"
          />
          <button
            onClick={joinBtn}
            className="py-2 px-4 w-64 bg-blue-600 text-white rounded-lg">
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
