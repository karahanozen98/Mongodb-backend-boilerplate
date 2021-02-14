import { Router } from "express";
import User from "../../models/model_User.js";
import bcrypt from "bcrypt";
import jsonWebToken from "jsonwebtoken";

async function encrypt(password) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
}

// Routers
const router = Router();

router.route("/login").post((req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      bcrypt.compare(password, user.password).then((isValid) => {
        if (!isValid) res.status(400).json("Password is incorrect!");
        else {
          // create a token for authentication and send response
          const token = jsonWebToken.sign(
            { id: user.id },
            process.env.SECRET_TOKEN
          );
          res.header("auth-token", token).json(token);
        }
      });
    })
    .catch((err) => {
      res.status(400).json("E-mail is not found!");
    });
});

router.route("/add").post((req, res) => {
  const { email, password, displayName, photoUrl } = req.body;
  encrypt(password).then((password) => {
    const newUser = new User({
      email,
      password,
      displayName,
      photoUrl,
    });
    newUser
      .save()
      .then(() => res.json("OK"))
      .catch((err) => {
        res.status(400).json(err);
      });
  });
});

router.route("/update").put((req, res) => {
  const { id, email, password, displayName, photoUrl } = req.body;
  const newUser = new User({ email, password, displayName, photoUrl });
  User.findById(id)
    .update(...newUser)
    .then(() => {
      res.json("OK");
    })
    .catch((err) => res.status(400).json(err));
});

router.route("/delete").delete((req, res) => {
  const id = req.body.id;
  User.findByIdAndDelete(id)
    .then(() => res.json("OK"))
    .catch((err) => res.status(400).json(err));
});

export default router;
