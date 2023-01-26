const express = require("express");
const jwt = require("jsonwebtoken");
const Pastry = require("../models/pastry");

const secret = process.env.JWT_SECRET || "secret?encryption!key";

const router = express.Router();

// @route   GET api/pastry
// @desc    Get All Pastries
// @access  Public
router.get("/api/pastry", async (req, res, next) => {
  try {
    const pastry = await Pastry.find();
    res.json(pastry);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route   GET api/pastry/:id
// @desc    Get One Pastry
// @access  Public
router.get("/api/pastry/:id", async (req, res, next) => {
  try {
    const pastry = await Pastry.findById(req.params.id);
    res.json(pastry);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route   POST api/pastry
// @desc    Create a Pastry
// @access  Private
router.post("/api/pastry", async (req, res, next) => {
  const { name, price, quantity, token } = req.body;

  try {
    jwt.verify(token, secret);
    const pastry = await Pastry.create({ name, price, quantity });
    res.status(200).send(pastry);
  } catch (err) {
    console.error({ msg: err.message });
    res.status(500).send({ msg: err.message });
  }
});

// @route   PUT api/pastry/:id
// @desc    Update a Pastry
// @access  Private
router.put("/api/pastry/:id", async (req, res, next) => {
  const { name, price, quantity, token } = req.body;

  try {
    jwt.verify(token, secret);

    const pastryFields = {};

    if (name) pastryFields.name = name;
    if (price) pastryFields.price = price;
    if (quantity) pastryFields.quantity = quantity;

    let pastry = await Pastry.findById(req.params.id);
    if (!pastry) return res.status(404).json({ msg: "Pastry not found" });

    pastry = await Pastry.findByIdAndUpdate(
      req.params.id,
      { $set: pastryFields },
      { new: true }
    );

    res.json(pastry);
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

// @route   DELETE api/pastry/:id
// @desc    Delete a Pastry
// @access  Private
router.delete("/api/pastry/:token/:id", async (req, res, next) => {
  try {
    jwt.verify(req.params.token, secret);

    let pastry = await Pastry.findById(req.params.id);
    if (!pastry) return res.status(404).json({ msg: "Pastry not found" });

    await Pastry.findByIdAndRemove(req.params.id);

    res.json({ msg: "Pastry removed" });
  } catch (err) {
    res.status(500).send({ msg: err.message });
  }
});

module.exports = router;
