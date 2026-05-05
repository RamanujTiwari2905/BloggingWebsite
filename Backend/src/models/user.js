const moongoose = require('mongoose');
const {Schema} = moongoose;
const userSchema = new Schema({
    firstName:{
        type:String,
        required: true,
        minLength:3,
        maxLength:20
    },
    lastName:{
        type:String,
        minLength: 3,
        maxLength: 20,
    },
    emailId:{
        type:String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        immutable: true,
    },
    bio:{
        type:String,
        minLength:10,
        maxLength: 25,
    },
    password:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


const User = moongoose.model("user",userSchema);
module.exports = User;