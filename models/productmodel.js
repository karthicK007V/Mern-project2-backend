const express=require("express");
const mongoose=require("mongoose");

const productSchema=mongoose.Schema({
    name:{
        type:String,require
    },
    price:{
        type:Number,require
    },
    image:{type:String,require},
   

},{
    timestamps:true,
})

const productmodel=mongoose.model("iproduct",productSchema);

module.exports=productmodel;





