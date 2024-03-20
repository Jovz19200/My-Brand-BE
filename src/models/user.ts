import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "user"
    },
    password:{
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },

});


export default mongoose.model("User", UserSchema);