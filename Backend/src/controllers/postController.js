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

const getSinglePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const post = await Post.findById(id)
        .populate("author","firstName");

        if(!post){
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        res.status(200).json({
            success: true,
            post,
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

const updatePost = async(req,res)=>{
    try{
        const {id} = req.params;
        const {title, content, category} = req.body;
        const post = await Post.findById(id);

        if(!post){
            res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        if(post.author.toString() !== req.user._id){
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            })
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.category = category || post.category;

        await post.save();

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            post
        })
    }catch(err){
        res.status(500).json({
            success: false,
            error: err.message
        })
    }
}

module.exports = {getAllPosts, getSinglePost, updatePost ,createPost};