import express from "express";
import { SignUpSchema ,SignInSchema, CreateRoomSchema } from '@repo/common/types';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { prisma } from '@repo/db/prisma-client';
import { JWT_SECRET } from "./config";
import { middleware } from "./middleware";
import cors from "cors"

const app = express();
app.use(express.json())
app.use(cors())

const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST'],
  };

app.post("/signup" , async (req ,res) => {
    
    try {


        const parsedData  = SignUpSchema.safeParse(req.body);

        if(!parsedData.success){
            res.status(402).json({
                message:"Invalid format!"
            })
            return;
        }

        const {username , email , password} = parsedData.data;
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })


        if(user){
            res.status(402).json({
                message:" user with the email already exists!"
            })
            return;
        }
        const hashedPassword = await bcrypt.hash(password , 10)
        
        await prisma.user.create({
            data:{
                username:username,
                email:email,
                password:hashedPassword
            }
        })

        res.status(201).json({
            message:"User signed Up!"
        })

    } catch (error:any) {

        if(error.name == "PrismaClientKnownRequestError" && error.meta.target[0] == "username") {
            res.status(400).json({
                message:"username already exists! please try other username!",
            })
            return
        }
        
        
        res.status(500).json({
            message:"Something went wrong!",
            error
        })
    }
})

app.post("/signin", async (req,res) => {
    
   try {
    
    const parsedData  = SignInSchema.safeParse(req.body);

    
    if(!parsedData.success) {
        res.status(402).json({
            message:"Invalid format!"
        })
        return;
    }

    const { email , password} = parsedData.data
    const user = await prisma.user.findFirst({
        where: {
            email: email
        }
    })


    if(!user){
        res.status(402).json({
            message:"user with the email doesn't exists!"
        })
        return;
    }

    const isMatched = await bcrypt.compare(password , user.password)

    if(!isMatched){
        res.status(402).json({
            message:"invalid credentials"
        })
        return;
    }

    const token = jwt.sign({userId:user.id},JWT_SECRET ) 


    res.status(200).json({
        message:"user signed in succesfully!",
        token
    })

   } catch (error) {
    res.status(500).json({
        message:"Something went wrong!",
        error
    })
} 
})

app.post("/room",middleware , async(req ,res) => {


try {

    const parsedData = CreateRoomSchema.safeParse(req.body);

    if(!parsedData.success){
        res.status(400).json({
            message:"invalid input format"
        })
        return;
    }

    const {name} = parsedData.data
    const userId = req.userId as unknown as string;

    await prisma.room.create({
        data:{
            name:name,
            adminId: userId
        }
    })

    res.status(201).json({
        name
    })
} catch (error:any) {

    if(error.name == "PrismaClientKnownRequestError" && error.meta.modelName == "Room" && error.meta.target[0] == "name"){
        res.status(409).json({
            message:"Room name already exists! Please try with other name.",
        })
        return;
    }

    res.status(500).json({
        message:"Something went wrong!",
        error
    })
}
})

app.get("/chats/:roomName", async (req ,res)=> {

    try {
        
        const roomName = req.params.roomName

    const messages = await prisma.chat.findMany({
        where:{
            roomName
        },
        take:50,
        orderBy:{
            id:"desc"
        }
        
    })

    res.status(200).json({
        messages
    })

    } catch (error) {
        console.error(error);
        
        res.status(500).json({
            message:"Something went wrong!",
            error
        })
    }

})

app.listen(3001)