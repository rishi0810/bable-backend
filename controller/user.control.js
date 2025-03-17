import User from "../models/user.model.js";
import { hashpassword, comparepassword } from "../utils/password.compare.js";
import { createtoken, validatetoken } from "../utils/auth.jsw.js";
const handlesignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existinguser = await User.findOne({ email: email });
    if (existinguser)
      return res.status(400).json({ message: "User already exists" });

    const hashp = await hashpassword(password);
    const newUser = new User({ name, email, password: hashp });
    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handlelogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await comparepassword(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const newToken = createtoken(user);
    res
      .status(200)
      .cookie("token", newToken, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
      })
      .json({ message: "Login successful", name: user.name });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const handlelogout = (req, res) => {
  res.clearCookie("token");
  res.json("Log out Successful");
};

const handleauthcheck = (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.json({ Authenticated: false });

  try {
    const payload = validatetoken(token);
    if (payload) res.json({ Authenticated: true });
  } catch (err) {
    res.json({ Authenticated: false, message: err });
  }
};

const handleuserdetails = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json({ Authenticated: false });

    const payload = validatetoken(token);
    if (!payload) return res.status(401).json({ message: "Unauthorized" });

    const userid = payload._id;

    const currentuser = await User.findOne({ _id: userid })
      .populate({
        path: "writtenBlogs",
        select: "heading ",
      })
      .populate({
        path: "storedBlogs",
        select: "heading",
      });

    if (!currentuser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json(currentuser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export {
  handlesignup,
  handlelogin,
  handlelogout,
  handleauthcheck,
  handleuserdetails,
};
