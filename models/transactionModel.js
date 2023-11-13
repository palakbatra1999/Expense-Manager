import mongoose, { Mongoose } from "mongoose";

const transactionschema = new mongoose.Schema({

    name : {
        type: String,
        required : true,
        unique : true
    },
    slug : {
        type : String,
        required : true
    },
    Txntype : {
         type : Boolean,
        required : true
    },
    amount : {
        type : Number,
        required : true
    },
    user : {
        type: mongoose.ObjectId,
        ref : "users",
        required : true
    }
 
},{timestamps:true})

export default mongoose.model('transaction',transactionschema);