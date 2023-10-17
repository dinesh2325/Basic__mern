const express = require("express");
const app=express();
const dotenv=require('dotenv');            //for storing password and secret key 
const mongoose=require('mongoose')



const User=require('./models/userSchema')

require('./db/conn')
app.use(express.json()) //to get the json data otherwise it will show undefine
dotenv.config({path:'./config.env'})

const PORT=process.env.PORT;             



app.use(require('./router/auth'))


app.listen(PORT,(req,res)=>{
    console.log(`server is runnig on ${PORT}`);
})