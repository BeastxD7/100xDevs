const express = require('express')
const userRoute = express.Router()
const {userSignUp,userSignIn} = require("../controllers/user")


userRoute.post('/signup', userSignUp);
userRoute.post('/signin', userSignIn);


module.exports = userRoute;
