import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique:true
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },
    displayName: {
      type: String,
      required: true,
      max: 30,
    },
    photoUrl: {
      type: String,
      required: false,
      max: 1024,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema, "users");

export default User;
