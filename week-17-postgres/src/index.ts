import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();


async function query() {
  const users = await client.user.create({
   data:{
    username:"Beast",
    email:"beast@beast.com",
    password:"qwerty"
   }
  })  
  console.log(users);
}

query()