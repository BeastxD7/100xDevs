const express = require('express');
const adminRoute = express.Router();
const { adminSignIn, adminSignUp,createCourse} = require('../controllers/admin');
const auth = require("../middlewares/authmiddleware")


adminRoute.post('/signup', adminSignUp);
adminRoute.post('/signin', adminSignIn);
adminRoute.post('/course', auth,createCourse);


module.exports = adminRoute;
