const express = require("express");
const User = require("../models/userModel");
const { getToken, isAuth } = require("../util");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/signin", async (req, res) => {
  const signinUser = await User.findOne({
    email: req.body.email,
  });

  if (signinUser) {
    res.send({
      _id: signinUser._id,
      name: signinUser.name,
      email: signinUser.email,
      isAdmin: signinUser.isAdmin,
      token: getToken(signinUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid Email or Password" });
  }
});

router.post("/register", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    isAdmin: req.body.isAdmin,
  });

  const newUser = await user.save();

  if (newUser) {
    res.send({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: getToken(newUser),
    });
  } else {
    res.status(401).send({ msg: "Invalid User data." });
  }
});

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "Marvin",
      email: "laramarvin105@gmail.com",
      password: "1234",
      isAdmin: true,
    });

    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ msg: error.message });
  }
});

router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;

  const user = await User.findById(userId);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updateUser = await user.save();

    res.send({
      _id: updateUser.id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: getToken(updateUser),
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

module.exports = router;
