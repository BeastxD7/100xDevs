import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();
app.use(express.json());

app.get("/users", async (req, res) => {
  try {
    const users = await prisma.users.findMany({
      select:{
        username:true,
        email:true
      }
    });
    res.status(200).json({
      messsage: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      messsage: "error",
      error,
    });
  }
});

app.get("/users/:id", async (req, res) => {
  try {

    const {id} = req.params

    const users = await prisma.users.findFirst({
      where:{id:parseInt(id) },
      select:{
        username:true,
        email:true
      }
    });
    res.status(200).json({
      messsage: "success",
      users,
    });
  } catch (error) {
    res.status(400).json({
      messsage: "error",
      error,
    });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await prisma.users.create({
      data: {
        username,
        email,
        password,
      },
    });
    res.status(200).json({
      messsage: "success",
      user,
    });
  } catch (error) {
    res.status(400).json({
      messsage: "error",
      error,
    });
  }
});

app.listen(3000, () => {
  console.log(`server running`);
});
