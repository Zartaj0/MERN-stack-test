const mongoose = require("mongoose");
const{ObjectId}=mongoose.Schema;

const productCartSchema=mongoose.Schema({
    product:{
        type:ObjectId,
        ref:'Product'
    },
    name:String,
    count:Number,
    price:Number
})
const ProductCart = mongoose.model("ProductCart",productCartSchema)

const orderSchema = new mongoose.Schema({
    product:[productCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    updated:Date,
    user:{
        type:ObjectId,
        ref:'user'
    }
},{timestamps:true})

const Order =mongoose.model("Order",orderSchema)

module.exports={Order,ProductCart}
