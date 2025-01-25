import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { SocketContext, SocketProvider } from "../Contexts/SocketProvider";

const Home = () => {
  const socketContext = useContext(SocketContext);
  let navigate = useNavigate();
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  let roomId: string | null = null;
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      alert("Message from server: " + event.data);
    };
    setSocket(ws);
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("roomId" , "")
  // })

  const joinBtn = () => {
    if (inputRef.current) {
      const roomId = inputRef.current.value.trim(); // Get the room ID
      if (!roomId) {
        alert("Enter Room ID to Join!");
        return;
      }

      // Save roomId to localStorage
      localStorage.setItem("roomId", roomId);

      // Use the context to send a "join" message
      if (socketContext?.socket) {
        socketContext.socket.send(
          JSON.stringify({ type: "join", payload: { roomId } })
        );
        navigate("/chat");
      } else {
        alert("WebSocket connection is not established!");
      }
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center flex-col">
      <h1 className="text-white text-xl text-center py-4 font-semibold">
        Chat Room
      </h1>
      <div className="md:w-1/2 w-[90%] h-1/2 bg-zinc-500 rounded-xl bg-opacity-30 flex flex-col items-center">
        <div className="flex flex-col gap-3 justify-center items-center h-full">
          <button className="py-2 px-4 w-64 bg-blue-600 text-white rounded-lg">
            Create Room
          </button>
          <input
            ref={inputRef}
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

export default Home;
