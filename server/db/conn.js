const mongoose=require('mongoose');
const dotenv=require('dotenv');


dotenv.config({path:'./config.env'})
const DB=process.env.DATABASE;

mongoose.set('strictQuery', true);
mongoose.connect(DB,{
    useNewUrlParser:true,
    // useCreateIndex:true,
    useUnifiedTopology:true,
    // useFindAndModify:false
}).then(()=>{
    console.log(`connection successful`)
}).catch((err)=>{
    console.log(err);
})  