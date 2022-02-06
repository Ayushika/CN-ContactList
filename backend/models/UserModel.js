/** @format */

import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      index: true,
    },
    number: {
      type: String,
      required: true,
      maxlength: 10,
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
export default User;
