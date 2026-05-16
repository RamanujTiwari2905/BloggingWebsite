const express = require("express")
const postRouter = express.Router();
const UserMiddleware = require('../middleware/UserMiddleware');
const {getAllPosts, getSinglePost ,createPost} = require("../controllers/postController");

postRouter.get("/",getAllPosts);
postRouter.post("/create",UserMiddleware,createPost);
postRouter.get("/:id", getSinglePost)

module.exports = postRouter;