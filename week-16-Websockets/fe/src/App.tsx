import { useState } from "react";

const App = () => {

  const [message ,setMessage] = useState("This is sample message");

  return (

    
    <div className="bg-slate-800 flex flex-col justify-center items-center h-screen w-screen">
      
        <div className="bg-slate-500 h-[70%] w-[70%] rounded-xl bg-opacity-45 text-white flex items-start p-10">
        <div className="bg-slate-400  p-4  rounded-2xl">
        {message}
        </div>
      </div>
      <div className="w-[60%] py-3 flex gap-6">
      <input  placeholder="Enter your message here..." className="w-full py-3 px-3 rounded-lg  text-xl outline-none shadow-xl" type="text" />
      <button  className="bg-blue-600 py-3 px-10 text-white font-semibold rounded-lg ">Send</button>
      </div>
      
    </div>
  );
};

export default App;
