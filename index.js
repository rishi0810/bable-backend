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
  res.setHeader('Access-Control-Allow-Origin', 'https://bable.vercel.app');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(
  cors({
    origin: 'https://bable.vercel.app',
    credentials: true, 
  })
);
app.use("/user", userroute);
app.use("/blog", blogroute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
