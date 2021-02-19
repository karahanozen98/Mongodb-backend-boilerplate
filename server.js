import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"))

//mongoDb connection
mongoose
  .connect(process.env.ATLAS_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, (err) => {
      console.log("Connection established");
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// API ROUTERS
// import routers
import authRouter from "./api/routes/authRouter.js";
import usersRouter from "./api/routes/userRouter.js";
import postRouter from "./api/routes/postRouter.js";
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/posts", postRouter);
