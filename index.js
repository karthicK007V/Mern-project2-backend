const express=require("express");
const dotenv=require("dotenv").config();
const db=require("./db/connect")
const productroute=require("./router/productrouter")
const cors=require("cors")
const userRoute=require("./router/userrouter")


const app=express();
app.use(express.json());

db();
app.use(cors())


// app.use("/",(req,res)=>{
//     res.send({
//         name:"karthick"
//     })
// })
app.use("/api",userRoute)
app.use("/api",productroute)

const port=process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`The server running http://localhost:${port}`);
})