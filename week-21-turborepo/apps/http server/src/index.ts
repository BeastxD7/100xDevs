import express from "express";

const app = express();

app.post("/signup" , (req ,res) => {
    
    try {
        //TODO:
        //zod validation
        const {username , email , password}  = req.body;
        //check existing user in db
        //hash the password using bcrypt
        //if not then insert to db
        res.status(201).json({
            message:"User signed Up!"
        })

    } catch (error) {
        res.status(500).json({
            message:"Something went wrong!"
        })
    }
  
})

app.post("signin", (req,res) => {
    
   try {
    
     //TODO:
    //zod validation
    const { email , password}  = req.body;
    //check email exists if yes
    //compare pass and store user in user variable, if true
    //generate token using jwt, encode the userId

    const token= 1;

    res.status(200).json({
        token
    })

   } catch (error) {
    res.status(500).json({
        message:"Something went wrong!"
    })
} 
})

app.post("/room" , (req ,res) => {


try {
    res.json({
        roomId:123
    })
} catch (error) {
    res.status(500).json({
        message:"Something went wrong!"
    })
}

})

app.listen(3001)