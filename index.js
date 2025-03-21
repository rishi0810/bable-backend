import express from "express";
import userroute from "./routes/user.js";
import blogroute from "./routes/blog.js";
import connectDB from "./db/blog.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Set-Cookie');
  next();
});
app.use(cors());
app.use("/user", userroute);
app.use("/blog", blogroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
