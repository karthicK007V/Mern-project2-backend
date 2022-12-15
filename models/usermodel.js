const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name:{type:String,require},
    email:{type:String,require ,unique: true },
    password:{type:String,require}
})

const usermodel=mongoose.model("user",userSchema);

module.exports=usermodel;