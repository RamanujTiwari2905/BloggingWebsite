const mongoose = require("mongoose")
const {Schema} = mongoose;
const postSchema = new Schema({
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    content: {
      type: String,
      required: [true, "Content is required"],
      minlength: 10,
    },
     category: {
      type: String,
      required: [true, "Category is required"],
      trim: true,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{
    timestamps: true,
})

const Post = mongoose.model("post", postSchema);
module.exports = Post;