const express = require("express")
const postRouter = express.Router();
const UserMiddleware = require('../middleware/UserMiddleware');
const {createPost} = require("../controllers/postController");

postRouter.post("/create",UserMiddleware,createPost);

module.exports = postRouter;