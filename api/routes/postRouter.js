import { Router } from "express";
import Post from "../models/Post.js";
import User from "../models/User.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
    cb(null, true);
  else cb(null, false);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
  fileFilter: fileFilter,
});

const router = Router();

router.route("/trending").get(async (req, res) => {
  try {
    let result = [];
    const allPosts = await Post.find().limit(6);
    for (let i = 0; i < allPosts.length; i++) {
      const post = allPosts[i];
      const author = await User.findById(post.authorID).select(
        "email displayName"
      );
      if (author) result.push({ ...post._doc, author });
      else console.log("Error, Post without author, id:", post._id);
    }
    res.json(result);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.route("/:id").get(async (req, res) => {
  const id = req.params.id;
  try {
    const post = await Post.findById(id);
    post.views++;
    await Post.findByIdAndUpdate(id, { views: post.views });
    if (post) res.json(post);
    else res.status(400).json("Post not found");
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post("/add", upload.single("postImage"), (req, res) => {
  try {
    const newPost = new Post({ ...req.body, imageUrl: req.file.path, views: 0 });
    newPost
      .save()
      .then(() => {
        res.json("OK");
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
});

export default router;
