const mongoose = require("mongoose")
const {ObjectId} = mongoose.Schema;

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:32

    },
    description:{
        type:String,  
        maxlength:2000,
        required:true,
        trim:true 
    },
    price:{
        type:Number,
        required:true,
        maxlength:32,
        trim:true
    },
    category:{
        type:ObjectId,
        ref:'Category',
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
    },
    photo:{
        data:Buffer,
        contentType:String
    }


}) 

module.exports= mongoose.model("Product",productSchema)