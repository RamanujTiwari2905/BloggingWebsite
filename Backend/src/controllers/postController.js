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

const getAllPosts = async(req,res)=>{
    try{
        const posts = await Post.find()
        .sort({createdAt: -1})
        .populate("author", "firstName");

        res.status(200).json({
            success: true,
            count: posts.length,
            posts,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
}

module.exports = {getAllPosts, createPost};