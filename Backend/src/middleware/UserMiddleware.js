const jwt = require('jsonwebtoken');
const User = require('../models/user');

const userMiddleware = async (req,res,next)=>{
    try{
        const {token} = req.cookies;
        if(!token)
            throw new Error("Token is not present")
        const payload = jwt.verify(token,process.env.JWT_TOKEN);

        const{_id} = payload;
        if(!_id)
            throw new Error("Id is missing");

        const result = await User.findById(_id);
        if(!result)
            throw new Error("User Doesn't Exist");

        req.user = payload;

        next();
    }
    catch(err)
    {
        res.status(401).send("Error "+err);
    }
}

module.exports = userMiddleware;