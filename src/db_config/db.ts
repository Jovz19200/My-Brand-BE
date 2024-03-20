
import mongoose from "mongoose";
require('dotenv').config()

export const  connectDB = async() =>{
    try {
        const connect  = await mongoose.connect(process.env.mongoURI as string);
        console.log(`MongoDB connected`);
    }
    catch(err){
        console.log(err);
    }
}
