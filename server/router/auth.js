const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt')                                //for hashing
const jwt=require('jsonwebtoken');                            //for token generation
const Authenticate=require('../middleware/authentication')     
const cookieParser = require("cookie-parser");                
router.use(cookieParser());


require("../db/conn");      
const User = require("../models/userSchema");





//user register
router.post("/register",async(req,res)=>{

    const {name,email,phone,password,cpassword}=req.body;      //destructuring
    if(!name || !email || !phone || !password || !cpassword)   //any field is not fill up
    {
        return res.status(422).json({error:"plz fill all area"});
    }
    
    try
    {
        const userexist = await User.findOne({email:email});
        if(userexist)                                                      
        {
            return res.status(422).json({error:"Email already in exist"});
        }
        else if(password!=cpassword)
        {
            return res.status(422).json({error:"password not matched"});
        }



        const user = new User({name,email,phone,password,cpassword});

        //we added middle ware between save to hash password which is in userschema file

        const userRegister = await user.save();

        if(userRegister)
        {
            return res.status(201).json({message:"user registered successfully"});
        }
        else{
            return res.status(500).json({error:"Failed to register"});
        }
    }
    catch(err)
    {
        console.log(err);
    }
    
    
})

//user login
router.post('/login',async(req,res)=>{

   try{
          let token;
          const {email,password}=req.body;     //destructuring 
          
          if(!email || !password)              //if any field is empty
          {
             return res.status(400).json({error:"plz fill the data"});
          }
          
          const userlogin=await User.findOne({email:email});
          if(userlogin)                                                    //email match
          {
            const match=await bcrypt.compare(password,userlogin.password)
            if(match)                                                                //password match
            {
                token=await userlogin.generateAuthToken();                //token generation function is in userSchema 
                console.log(token);
                //res have a method called cookie
                res.cookie("jwtoken",token,{
                    expires:new Date(Date.now()+70000000000),
                    httpOnly:true
                })

                res.status(200).json({message:"user logged successfull"});
            }
            else res.status(400).json({error:"Invalid credentials"});
          }
          else
          {
            res.status(400).json({error:"Invalid credentials"})
          }
         

   }
   catch(err)
   {
       console.log(err);
   }
})




// about page
router.get('/about',Authenticate,(req,res)=>{
    res.send(req.rootUser);     //req.rootUser is got from the Athentication middleware and it is used in frontened to get user info
})


//for home page 
router.get('/getData',Authenticate,(req,res)=>{
    res.send(req.rootUser);
})

//for logout
router.get('/logout',(req,res)=>{
    res.clearCookie('jwtoken',{path:'/'})
    res.status(200).send('User Logout');
})

module.exports=router;