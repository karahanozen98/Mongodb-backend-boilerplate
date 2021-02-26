import mongoose from "mongoose";
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    authorID: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      max: 10000,
    },
    views: {
      type: Number,
    },
    tags: {
      type: Array,
      required: true,
    },
    imageUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema, "posts");

export default Post;
