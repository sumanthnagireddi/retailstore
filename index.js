const express=require("express");
const app=express();

const PORT=3000

const user_router=require("./src/routes/user.route")
const db=require("./src/config/dbConfig");

db();


app.use("/api/users",user_router);


app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})