import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  img_url: {
    type: String,
    required: true,
  },
});

const Blog = mongoose.model("Blog", blogSchema);
export default Blog;
