const express = require("express");
require('dotenv').config()
const  mongoose = require('mongoose');
const userRoute = require('./routes/user.route')
const adminRoute = require('./routes/admin.route')

const cors = require('cors')
const app = express();

app.use(cors())

app.use(express.json())

app.use('/users', userRoute)
app.use('/admin', adminRoute)



const main =  async () => {

    try {

        await mongoose.connect(`${process.env.MONGO_URL}`)
        console.log(`db connected`);
        
    } catch (error) {
        console.log(`error connecting db.`);
        console.log(`Error: ${error}`);

        
    }
    

    app.listen (process.env.PORT, () => {
        console.log(`Server running: http://localhost:${process.env.PORT}`);
    })
}

main()