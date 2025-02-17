"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {

  const [roomName , setRoomName] = useState("")
  const router= useRouter()

  const handleJoin = () => {
    router.push(`/room/${roomName}`)
  }

  return (
      <div style={
        {display:"flex",
          width:"100vw",
          height:"100vh",
          justifyContent:"center",
          alignItems:"center"
        }
      }>
      <input value={roomName} onChange={(e) => {setRoomName(e.target.value)}} type="text" placeholder="Room name" />
      <button onClick={handleJoin}>Join Room</button>
      </div>
  );
}
