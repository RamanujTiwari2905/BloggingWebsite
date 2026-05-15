const Post = require("../models/post")

const createPost = async (req,res)=>{
    try{
        const {title, content, category} = req.body;
        
        if(!title || !content || !category){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newPost = new Post({
            title, content, category,
            author: req.user._id,
        });
        await newPost.save();

        res.status(201).json({
            success: true,
            message:"Post created successfully",
            post: newPost,
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: err.message,
        });
    }
}

module.exports = {createPost};