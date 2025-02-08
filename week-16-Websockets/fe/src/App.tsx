import { useEffect, useRef, useState } from "react";

const App = () => {

  const [messages ,setMessages] = useState(["hi"]);
  const inputRef = useRef<HTMLInputElement>(null)

    const inputValue:any = inputRef.current?.value
    const [socket , setSocket] = useState<WebSocket | null>(null)
  
    const sendButton = () => {
      if(!socket) {
        return
      }
      //@ts-ignore
      socket.send(inputValue)
      setMessages([...messages ,inputValue])
    }

    useEffect(() => {
      const ws = new WebSocket("ws://localhost:8080")
      setSocket(ws)

      ws.onmessage = (event) => {
        setMessages([...messages , event.data])
      }
    } , [])

  return (

    
    <div className="bg-slate-800 flex flex-col justify-center items-center h-screen w-screen">
       
      
        <div className="bg-slate-500 h-[70%] w-[70%] rounded-xl bg-opacity-45 text-white flex items-start p-10">
        <div>
        {messages.map((message,index) =>  (<div key={index} className="bg-slate-400  p-4  rounded-2xl">
          {message}
          </div>) )}
        </div>
      </div>
      <div className="w-[60%] py-3 flex gap-6">
      <input  ref={inputRef} placeholder="Enter your message here..." className="w-full py-3 px-3 rounded-lg  text-xl outline-none shadow-xl" type="text" />
      <button onClick={sendButton}  className="bg-blue-600 py-3 px-10 text-white font-semibold rounded-lg ">Send</button>
      </div>
      
    </div>
  );
};

export default App;
