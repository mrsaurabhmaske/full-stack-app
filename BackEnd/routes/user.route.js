const express = require("express");
const { UserModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { redundantuser } = require("../middlewares/redundantuser.middleware");
const userRouter = express.Router();

userRouter.get("/", (req, res) => {
  res.status(200).send({ msg: "This is UsersPage" });
});

userRouter.post("/register", redundantuser, (req, res) => {
  try {
    const { username, password, email } = req.body;
    bcrypt.hash(password, 5, async (err, hash) => {
      if (err) {
        res
          .status(400)
          .send({ msg: "Error while Storing Password", Error: err });
      } else {
        const user = new UserModel({ username, password: hash, email });
        await user.save();
        res.status(200).send({
          msg: "User Registered Successfully",
          userDetails: {
            username: user.username,
            email: user.email,
          },
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await UserModel.findOne({ email });
    if (userFound) {
      const isMatch = await bcrypt.compare(password, userFound.password);
      if (isMatch) {
        const token = await jwt.sign(
          { email: userFound.email, username: userFound.username },
          process.env.secretcode
        );
        res.status(200).send({ msg: "Login Scccessful", token: token });
      } else {
        res.status(400).send({ msg: "Invalid Password..." });
      }
    } else {
      res.status(200).send({ msg: "No such user Exists! Please try again!" });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = { userRouter };
