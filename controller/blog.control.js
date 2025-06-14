import Blog from "../models/blog.models.js";
import User from "../models/user.model.js";
import { validatetoken } from "../utils/auth.jsw.js";
const blogcreate = async (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = validatetoken(token);

    if (!payload) return res.status(401).json({ message: "Unauthorized" });

    const author = payload._id;
    const { heading, content, img_url } = req.body;

    const newBlog = new Blog({ heading, content, author, img_url });
    await newBlog.save();

    await User.findByIdAndUpdate(
      author,
      { $addToSet: { writtenBlogs: newBlog._id } },
      { new: true }
    );

    res
      .status(201)
      .json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteblog = async (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = validatetoken(token);
    if (!payload) return res.status(401).json({ message: "Unauthorized" });

    const { id } = req.params;
    const reqauthor = payload._id;

    const blogtodelete = await Blog.findOne({ _id: id });
    if (!blogtodelete)
      return res.status(404).json({ message: "Blog not found" });

    const writer = blogtodelete.author;
    if (reqauthor != writer)
      return res.status(401).json({ message: "Unauthorized to delete" });

    await Blog.deleteOne({ _id: id });
    await User.findByIdAndUpdate(reqauthor, { $pull: { writtenBlogs: id } });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const blogfetch = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findOne({ _id: id }).populate("author", "name");

    if (!blog) {
      return res.status(404).json({ error: "Blog not found" });
    }

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
};

const blogfetchall = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .select("_id heading author img_url")
      .populate({
        path: "author",
        select: "_id name",
      });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Internal Sever Error" });
  }
};

const addblogtosave = async (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = validatetoken(token);
    if (!payload) return res.status(401).json({ message: "Unauthorized" });
    const author = payload._id;
    const { blogid } = req.params;
    const blog = await Blog.findOne({ _id: blogid });

    const user = await User.findById(author);
    if (user.storedBlogs.includes(blogid)) {
      return res.status(400).json({ message: "Already saved" });
    }

    if (!blog)
      return res.status(500).json({ message: "Could not find the blog" });

    await User.findByIdAndUpdate(
      author,
      { $addToSet: { storedBlogs: blogid } },
      { new: true }
    );
    return res.status(200).json({ message: "Added to the stored blogs" });
  } catch (err) {
    console.error("Encountered : " + err);
  }
};

const removefromsave = async (req, res) => {
  try {
    const token = req.cookies.token;
    const payload = validatetoken(token);
    if (!payload) return res.status(401).json({ message: "Unauthorized" });
    const requser = payload._id;
    const { blogid } = req.params;
    const user = await User.findByIdAndUpdate(
      requser,
      { $pull: { storedBlogs: blogid } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Blog removed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export {
  blogcreate,
  blogfetchall,
  blogfetch,
  deleteblog,
  addblogtosave,
  removefromsave,
};
