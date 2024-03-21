import mongoose from "mongoose";

export interface UserType {
    name?: string,
    email?: string,
    role?: string,
    password?: string
}
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
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