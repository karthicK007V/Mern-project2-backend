const express=require("express");
const User=require("../models/usermodel");
const router=express.Router();
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt")

router.post("/signup",async(req,res)=>{

    try{
        const exuser=User.findOne({email:req.body.email})

        if(!exuser)
       return res.json({
            message:"Your already user please login here",
            success:false
        }).status(400);
    
        const salt=await bcrypt.genSalt(Number(10));
        const hashpassword=await bcrypt.hash(req.body.password,salt);

        await new User({...req.body,password:hashpassword}).save();
        const us=req.body;
        return res.json({message:`${us.name} user Create SuccessFully`,name:`${us.name}`}).status(201)
    
    }
    catch(err){
        console.log(err);
        res.send({message:`${err}  server Error`}).status(500);
    }
   


})


router.post("/signin",async(req,res)=>{

    try{
     const user=await User.findOne({email:req.body.email});

     if(!user)
     return res.json({
        message:"Your Not a Register User Please SignUp Here"
     }).status(409)

     const valid=await bcrypt.compare(req.body.password,user.password);
     if(!valid)
     return res.json({message:"Please Enter Valid Password"}).status(409)

     const token=jwt.sign(user.toObject(),process.env.SECRET_KEY,{expiresIn: "1hr"})
     res.json({
        message:"Login SuccessFully",
        token,
        name:user.name

     })
    }

     catch(err){
        console.log(err);
        res.send({message:`${err}  server Error`}).status(500);
    }
   

})

// router.get("/getuser",async(req,res)=>{
//     try{
//     await User.find((err,data)=>{
//         if(err){
//             res.send({message:"Data Loading Failed"}).status(409)

//         }else{
//             res.send(data).status(200)
//         }
//     })}
//     catch(err){
//         console.log(err);
//         res.send({message:`${err}  server Error`}).status(500);
//     }
   

// })
router.get("/getuser",(req,res,next)=>{
    User.find((err,data)=>{
        console.log(data,err);
        if(err){
            console.log(err);
            
            res.status(404).json({
                message:"data failed"
            })

        }
        else{
            res.send(data).status(201)
        }
    })

})


module.exports=router;
