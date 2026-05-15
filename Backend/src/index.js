const express = require("express")
const app = express();
const cookieparser = require("cookie-parser");
require('dotenv').config();
const main = require('./config/db')
const authRouter = require('./routes/userAuthentication')
const postRouter = require('./routes/postRoutes')


app.use(express.json());
app.use(cookieparser());
app.use('/user',authRouter);
app.use("/api/posts",postRouter);


const InitalizeConnection = async ()=>{
    try{
        await Promise.all([main()])
        console.log("DB Connected");
        app.listen(process.env.PORT, ()=>{
            console.log("Server listening at port number :"+ process.env.PORT)
        })
    }
    catch(err){
        console.log("Error "+err);
    }
}

InitalizeConnection();