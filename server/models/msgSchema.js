const mongoose=require('mongoose');

const msgSchema=new mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true
    },
    location:{
        type:String,
        require:true,
    },
    category:{
        type:String,
        require:true,
    },
    url:{
        type:String,
        require:true,
    }

})
//create model
const Message=new mongoose.model("MESSAGE",msgSchema);
module.exports=Message;