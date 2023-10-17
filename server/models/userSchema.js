const mongoose = require('mongoose');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]
})


//password hashing with bcrypt
userSchema.pre('save',async function(next){
    if(this.isModified('password'))
    { 
        this.password=await bcrypt.hash(this.password,12);
        this.cpassword=await bcrypt.hash(this.cpassword,12);
    }
    next();
})



//token generation while login  
userSchema.methods.generateAuthToken= async function(){
    try{
        const newtoken=await jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens=this.tokens.concat({token:newtoken});
        await this.save();
        return newtoken;
    }catch(e)
    {
        console.log(e);
    }
}



const User=mongoose.model('user',userSchema);

module.exports=User;