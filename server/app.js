const dotenv=require('dotenv');
const express=require('express');
const bcryptjs=require("bcryptjs");
const jwt =require("jsonwebtoken");
const cookieParser=require('cookie-parser');

const app=express();

dotenv.config({path:'./config.env'});
require('./db/conn');
const port=process.env.PORT;
//require model

const Users=require("./models/userSchema");
const Message=require("./models/msgSchema");
//this method is use to get data from frontend
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send ("hello");
})

//====================================================================registration 
app.post('/register',async (req,res)=>{
    try {
        const username=req.body.username;
        const password=req.body.password;
        const email=req.body.email;

        const createUser=new Users({
            username:username,
            email:email,
            password:password
        });
//save method is used to create user or insert user
//but before saving we have to hash the password
//
        const created=await createUser.save();
        console.log(created);
        console.log(req.body.username);
        res.status(200).send('registered');
    } catch (error) {
        // console.log(400).send(error);
    }
})


//====================================================================application
app.post('/message',async (req,res)=>{
    try {
        
        const title=req.body.title;
        const description=req.body.description;
        const location=req.body.location;
        const category=req.body.category;
        const url=req.body.url;
        

        const sendMsg=new Message({
            title:title,
            description:description,
            location:location,
            category:category,
            url:url,
           


        });
//save method is used to create user or insert user
//but before saving we have to hash the password
//
        const created=await sendMsg.save();
        console.log(created);
        // console.log(req.body.username);
        res.status(200).send('application submited');
    } catch (error) {
        console.log(error);
    }
})

//====================================================================login user
app.post('/login',async (req,res)=>{
try {
    const email=req.body.email;
    const password=req.body.password;

    const user=await Users.findOne({email:email});
    if(user){
        const isMatch=await bcryptjs.compare(password,user.password);
        if(isMatch){
            //generate token which is define in user schema
            const token =await user.generateToken();
            res.cookie("jwt",token,{
                expires:new Date(Date.now()+86400000),
                httpOnly:true
            })
            res.status(200).send("loggedin");
            // console.log("hello");
        }else{
            res.status(400).send("INvalid credential");
        }
    }else{
        res.status(400).send("INvalid credential");
    }
} catch (error) {
    res.status(400).send(error);
}
})

app.listen(port,()=>{
    console.log("listinig on port number ${port}");
})