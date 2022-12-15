const express=require("express");
const products=require('../models/productmodel')


const router=express.Router();

router.get("/getproduct",(req,res)=>{
    products.find((err,data)=>{
        if(err){
            res.send({message:"Some things Is wrong"}).status(400);
        }else{
            res.send(data).status(200);
            console.log(data);
        }
    })

})

router.post("/createproduct",(req,res)=>{
    const payload=req.body;
    const product=new products(payload);
    product.save((err,data)=>{
        if(err){
            res.send({message:"Failed to Create products"}).status(400);

        }else{
            res.json({
                data,
                message:"Products Create Successfully"
            })
        }
    })
})

router.put("/updateproduct/:id",(req,res)=>{

    products.findByIdAndUpdate({_id:req.params.id},{$set:req.body},(err,data)=>{
        if(err){
            res.send({message:"Failed to Update products"}).status(400);

        }else{
            res.json({
                data,
                message:"Product update Successfully"
            })
        }
    })
    
})

router.delete("/deleteproduct/:id",(req,res)=>{
    products.deleteOne({_id:req.params.id},(err,data)=>{
        if(err){
            res.send({message:"Failed to delete products"}).status(400);

        }else{
            res.json({
                data,
                message:"Product delete Successfully"
            })
        }
    })
    })


module.exports=router;