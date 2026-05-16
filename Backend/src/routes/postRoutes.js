const express = require("express")
const postRouter = express.Router();
const UserMiddleware = require('../middleware/UserMiddleware');
const {getAllPosts, createPost} = require("../controllers/postController");

postRouter.get("/",getAllPosts);
postRouter.post("/create",UserMiddleware,createPost);

module.exports = postRouter;