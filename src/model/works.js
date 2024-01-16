import mongoose, { Schema } from "mongoose";

const workSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    addDate:{
        type:Date,
        required:true,
        default:Date.now()
    },
    status:{
        type:String,
        enum:['pending','completed'],
        default:'pending'
    },
    userId:{
        type:mongoose.ObjectId,
        required:true
    }
})

export const Works= mongoose.models.works || mongoose.model('works', workSchema)