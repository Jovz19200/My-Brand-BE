const mongoose = require('mongoose')
require('dotenv').config()

export const  connectDB = async() =>{
    try {
        const connect  = await mongoose.connect(process.env.mongoURI);
        console.log(`MongoDB connected`);
    }
    catch(err){
        console.log(err);
    }
}
