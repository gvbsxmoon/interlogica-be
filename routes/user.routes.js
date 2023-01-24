const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const secret = process.env.JWT_SECRET || "secret?encryption!key";

const router = express.Router();

router.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) res.status(400).send({ msg: "User not found" });

    if (!user.comparePassword(req.body.password))
      res.status(401).send({ msg: "Invalid username or password" });

    const token = jwt.sign(JSON.parse(JSON.stringify(user)), secret, {
      expiresIn: 10800,
    });

    res
      .status(200)
      .send({ logged: true, auth: user.roles[0].auth, token: token });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
