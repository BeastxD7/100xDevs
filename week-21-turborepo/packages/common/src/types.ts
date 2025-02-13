import z from "zod";

export const SignUpSchema = z.object({
    username: z.string().min(3, {message:"username should be greater than 3 letters"}).max(20,  {message:"username should be less than 20 letters"}),
    email:z.string().email(),
    password:z.string().min(5, {message:"password should be greater than 3 letters"}).max(20,  {message:"password should be less than 20 letters"}),
})


export const SignInSchema = z.object({
    email:z.string().email(),
    password:z.string().min(5, {message:"password should be greater than 3 letters"}).max(20,  {message:"password should be less than 20 letters"}),
})

export const CreateRoomSchema = z.object({
    name:z.string().min(1)
})