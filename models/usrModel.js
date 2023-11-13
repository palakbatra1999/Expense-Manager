import mongoose, { Mongoose } from "mongoose";

const userschema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true
    },
    password : {
        type : String,
        required : true,
       
    },
    address : {
        type : String,
        default : 0
       
    },
    phone : {
        type : Number,
        required : true,
     
    },
    question : {
        type : String,
      required : true
    },
    role : {
        type: Number,
       
      
    }
},{timestamps:true})

export default mongoose.model('users',userschema);