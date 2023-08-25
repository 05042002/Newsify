const mongoose=require('mongoose');

const db=process.env.DATABASE;

//mongodb+srv://admin:admin@cluster0.aymeoee.mongodb.net/esd?retryWrites=true&w=majority

mongoose.connect(db,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("connection successfully");
}).catch((e)=>{
    console.log(e);
})