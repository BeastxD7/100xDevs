"use client"

import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { BACKEND_URL } from '../../config'


const getChats = async (roomName:string) => {
  const response = await axios.get(`${BACKEND_URL}/chats/${roomName}`)
  console.log(response.data.messages);
  return response.data.messages;
}

interface IMessages {
  id:number
  message:string
  roomName:string
  userId:string
}

const page = () => {

    const params = useParams()
    const roomName = params.roomName
    const [messages, setMessages] = useState<IMessages[]>([]);
    
    useEffect(()=>{
      if(typeof roomName ==="string"){
        getChats(roomName).then((messages) => {
          setMessages(messages);
        });
      }}, [])

  return (
    <div>
      <h1>roomName: {roomName}</h1>
      {messages.map((msg,index) => <h1 key={index}>{msg.message}</h1>)}
    </div>
  )
}

export default page