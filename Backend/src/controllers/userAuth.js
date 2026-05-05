const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const register = async (req,res)=>{
    try{
        // validate(req.body);
        const {firstName, emailId, password} = req.body;
        req.body.password = await bcrypt.hash(password, 10);
        const user = await User.create(req.body);
        const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_TOKEN,{expiresIn: 60*60})
        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
        }
        res.cookie('token',token,{maxAge: 60*60*1000})
        res.status(201).json({
            user:reply,
            message:"Registered Successfully"
        })
    }
    catch(err){
        console.error("Register Error:", err); 
        res.status(400).send("Error "+err);
    }
}

const login = async (req,res)=>{
    try{
        const {emailId, password} = req.body;
        if(!emailId)
            throw new Error("Invalid Credentials")
        if(!password)
            throw new Error("Invalid Credentials")

        const user = await User.findOne({emailId});
        const match = await bcrypt.compare(password,user.password);
        if(!match)
            throw new Error("Incorrect Password");

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
        }

        const token = jwt.sign({_id:user._id,emailId:emailId},process.env.JWT_TOKEN,{expiresIn: 60*60})
        res.cookie('token',token,{maxAge: 60*60*1000})
        res.status(200).json({
            user:reply,
            message:"Login Successfully"
        })
    }
    catch(err){
        res.status(201).send("Error "+err);
    }
}

// const logout = async (req,res)=>{
//     try{
//         const {token} = req.cookies;
//         const payload = jwt.decode(token);
//         await redisClient.set(`token:${token}`,'Blocked')
//         await redisClient.expireAt(`token:${token}`,payload.exp)
//         res.cookie("token",null,{expires:new Date(Date.now())});
//         res.send("Logout Successfully");
//     }
//     catch(err){
//         res.status(503).send("Error "+err)
//     }
// }


const DeleteProfile = async (req,res)=>{
    try{
        const userId = req.result._id;
        User.findByIdAndDelete(userId);
        res.status(200).send("Deleted Successfully");
    }
    catch(err){
        res.status(500).send("Internal Sever Error");
    }
}

module.exports = {register, login};