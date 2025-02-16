import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from "./config";
import { prisma } from "@repo/db/prisma-client";


const wss = new WebSocketServer({port:3002})

const checkUser = (token:string): string | null => {
    try {
        const decoded = jwt.verify(token,JWT_SECRET)

    if(typeof decoded == "string"){   
        return null;
    }
    
    if(!decoded || !decoded.userId){
        return null;
    }

    return decoded.userId
    } catch (error) {
        return null;
    }
}

interface IUser {
    userId:string
    rooms:string[],
    ws:WebSocket
}

const users:IUser[] = []

wss.on("connection" ,(ws,request) => {

    const url = request.url;
    if(!url) {
        ws.close();
        return
    }

    const queryParams =  new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';

    const userId = checkUser(token);

    if(!userId){
        ws.close();
        return;
    }

    users.push({
        userId,
        rooms:[],
        ws:ws
    })



    ws.on("message", async (message) => {

        try {
            
            const parsedData = JSON.parse(message.toString())

            if(parsedData.type === "join-room"){    

                const user = users.find(user => user.ws === ws);
                if (user && !user.rooms.includes(parsedData.roomName)) {
                    user.rooms.push(parsedData.roomName);
                }else{
                    ws.send(JSON.stringify({type:"info", message: "Room already exists."}))
                }
            }
            

            if(parsedData.type === "leave-room"){
                const user = users.find(user => user.ws === ws);

                if(!user){
                    return;
                }

                user.rooms = user.rooms.filter(roomName => parsedData.roomName !== roomName)
            }

            console.log("Users array:", users);
            console.log("Received message:", parsedData);
            console.log("Rooms array:", users.map(user => user.rooms));

            

            if(parsedData.type === "chat"){
                const roomName = parsedData.roomName
                const message = parsedData.message

                await prisma.chat.create({
                    data:{
                        userId,
                        message,
                        roomName
                    }
                })

                users.forEach(user => {
                    if(user.rooms.includes(roomName)){
                        user.ws.send(JSON.stringify({
                            type:"chat",
                            message,
                            roomName
                        }))
                    }
                });

            }

        } catch (error) {
            ws.send(JSON.stringify(error))
            
            ws.send("invalid json format.")
        }

    })
})