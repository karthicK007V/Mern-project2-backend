const mongoose=require("mongoose");

db=async()=>{
  
    try {
        const res=await mongoose.connect(process.env.MONGO_URL,{ useNewUrlParser: true, useUnifiedTopology: true });
        console.log("db connection successfully");
        // console.log(res);
        
        
    } catch (error) {
        console.log(error);
        
    }

}

module.exports=db;