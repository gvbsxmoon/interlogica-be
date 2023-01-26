const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const dotenv = require("dotenv");

dotenv.config();

const secret = process.env.JWT_SECRET || "secret?encryption!key";

const router = express.Router();

/* router.post('/mockusers', async (req, res) => {
  try {
    await User.create({
      username: "luana.angelino",
      password: "luana123",
      roles: [{
        auth: "admin",
      }]
    })
    await User.create({
      username: "maria.fumagalli",
      password: "maria123",
      roles: [{
        auth: "admin",
      }]
    })
    await User.create({
      username: "luca.natale",
      password: "luca123",
      roles: [{
        auth: "db_moderator",
      }]
    })

    res.status(200).send();
  } catch(e) {
    console.log(e)
  }
}) */

router.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      res.status(400).send({ msg: "User not found" });
      return;
    }

    const compared = await user.comparePassword(req.body.password);

    if (!compared) {
      res.status(401).send({ msg: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(JSON.parse(JSON.stringify(user)), secret, {
      expiresIn: 10800,
    });

    res.json({ logged: true, auth: user.roles[0].auth, token: token });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
