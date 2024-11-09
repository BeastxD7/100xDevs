const  mongoose = require('mongoose');
const { Schema } = mongoose;
const {ObjectId} = mongoose.Types

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const adminSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
})

const courseSchema = new Schema ({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,

    },
    price:{
        type:Number,
        required:true
    },
    imageurl:{
        type:String,
        required:true
    },
    creatorId:{
        type:ObjectId,
        required:true
    }
})



const User = mongoose.model('User',userSchema)
const Admin = mongoose.model('Admin', adminSchema)
const Course = mongoose.model('Course',courseSchema)

module.exports = {User,Admin,Course};