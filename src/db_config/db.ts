
import mongoose from "mongoose";
require('dotenv').config()

export const  connectDB = async() =>{
    try {
        const connect  = await mongoose.connect(process.env.mongoURI as string);
    }
    catch(err){
        console.log(err);
    }
}

export const closeDB = async() =>{
    try{
        await mongoose.connection.close();
    }
    catch(err){
        console.log(err);
    }
}
