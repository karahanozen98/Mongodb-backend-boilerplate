import express, { json } from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const PORT = process.env.PORT;
const app = express();

app.use(cors());
app.use(express.json());

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
import authRouter from "./routes/api/authRouter.js";
import usersRouter from "./routes/api/userRouter.js";
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
