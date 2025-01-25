import { useRef, useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState(["Hello From the System", "ok"]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = () => {
    const msg = inputRef.current?.value;
    if (msg) {
      setMessages([...messages, msg]);
    }
  };

  return (
    <div className="w-screen h-screen bg-slate-900 flex justify-center items-center flex-col">
      <h1
        className="
  text-white text-xl text-center py-4 font-semibold">
        Chat Room: {localStorage.getItem("roomId")}
      </h1>
      <div className="md:w-1/2 w-[90%] h-1/2 bg-zinc-500 rounded-xl bg-opacity-30 flex flex-col items-center py-3 ">
        <div className="flex flex-col gap-3 justify-start px-4">
          {messages.map((message, index) => {
            return (
              <div
                key={index}
                className=" bg-white bg-opacity-80 py-2 px-3 w-fit rounded-xl max-w-[90%]">
                {message}
              </div>
            );
          })}
        </div>
      </div>
      <div className="md:w-1/2 w-[90%] flex justify-between gap-1">
        <input
          ref={inputRef}
          className="w-[90%] py-1 px-3 text-lg outline-none bg-zinc-600 text-white mt-2 rounded-md"
          type="text"
        />
        <button
          onClick={sendMessage}
          className="w-fit flex-end bg-blue-500 py-2 mt-2 px-5 text-white font-semibold rounded-md">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
