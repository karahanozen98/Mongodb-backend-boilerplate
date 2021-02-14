import { Router } from "express";
import User from "../../models/model_User.js";
import verify from "./verifyToken.js";

const router = Router();

router.get("/", verify, (req, res) => {
  const id = req.user.id;
  User.findById(id)
    .then((user) => {
      // dont send password
      user.password=undefined;
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json("Not found");
    });
});
export default router;
