import { useEffect, useRef, useState } from "react";

function App() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [socket, setSocket] = useState<WebSocket>()
  let message:string |null = null

  const sendButton = () => {
    if (inputRef.current) {
      message = inputRef.current.value
      console.log(message);

     if(socket) {
      socket.onmessage = (event) => {
        alert(event.data)
      }
     }

      socket?.send(message)


    }
  };


  useEffect(() => {

    const ws = new WebSocket("ws://localhost:8080");

    ws.onopen = () => {
      console.log("ws connected");
    }

    setSocket(ws)
  } , [])

  return (
    <>
      <div className="bg-zinc-800  w-screen h-screen text-white flex flex-col justify-center items-center">
        <div className="w-full justify-center flex">
          <input
            ref={inputRef}
            className="w-1/2 py-2 px-3 rounded-lg text-lg text-white outline-none shadow-2xl shadow-white bg-zinc-800"
            placeholder="Write your message here..."
            type="text"
          />
          <button
            onClick={sendButton}
            className="py-2 px-6 bg-blue-600 rounded-lg ">
            {" "}
            Send
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
