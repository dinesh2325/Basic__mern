const jwt = require('jsonwebtoken');
const User=require('../models/userSchema');


const Authenticate=async(req,res,next)=>{
    try
    {
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);

        const rootUser=await User.findOne({_id:verifyToken._id,"tokens.token":token})
        if(!rootUser) {throw new Error('No access to this page')}     //if error then we need to navigate to login in frontned

        req.token=token;
        req.rootUser=rootUser;
        req.userID=rootUser._id;
        next(); 
    }
    catch(e)
    {
        res.status(400).send('Unauthorized:No token provided');
    }
}


module.exports=Authenticate;

// if token is there then okay otherwise it will give error 