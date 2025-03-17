import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    storedBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        default: null,
      },
    ],
    writtenBlogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
        default: null,
      },
    ],
  },
  { timestamps: true }
);
const User = mongoose.model("User", userSchema);
export default User;
