import mongoose, { Schema } from "mongoose";

const userSchema= new Schema({
    name:String,
    email:{
        type:String,
        unique:true,
        required:[true,'Email is require..']
    },
    password:{
        type:String,
        required:[true,'Password is require']
    },
    about:String,
    profileURL:String
})

export const User= mongoose.models.users || mongoose.model('users', userSchema)