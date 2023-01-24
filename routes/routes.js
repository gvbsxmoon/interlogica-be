const express = require("express");
const Pastry = require("../models/pastry");

const router = express.Router();

// @route   GET api/pastry
// @desc    Get All Pastries
// @access  Public
router.get("/api/pastry", async (req, res) => {
  try {
    const pastry = await Pastry.find();
    res.json(pastry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});


// @route   GET api/pastry/:id
// @desc    Get One Pastry
// @access  Public
router.get("/api/pastry/:id", async (req, res) => {
  try {
    const pastry = await Pastry.findById(req.params.id);
    res.json(pastry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/pastry
// @desc    Create a Pastry
// @access  Private
router.post("/api/pastry", async (req, res) => {
  const { name, price, quantity } = req.body;

  try {
    const pastry = await Pastry.create({ name, price, quantity });
    res.status(200).send(pastry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/pastry/:id
// @desc    Update a Pastry
// @access  Private
router.put("/:id", async (req, res) => {
  const { name, price, quantity } = req.body;

  const pastryFields = {};
  if (name) pastryFields.name = name;
  if (price) pastryFields.price = price;
  if (quantity) pastryFields.quantity = quantity;

  try {
    let pastry = await Pastry.findById(req.params.id);
    if (!pastry) return res.status(404).json({ msg: "Pastry not found" });

    pastry = await Pastry.findByIdAndUpdate(
      req.params.id,
      { $set: pastryFields },
      { new: true }
    );

    res.json(pastry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/pastry/:id
// @desc    Delete a Pastry
// @access  Private
router.delete("/api/pastry/:id", async (req, res) => {
  try {
    let pastry = await Pastry.findById(req.params.id);
    if (!pastry) return res.status(404).json({ msg: "Pastry not found" });

    await Pastry.findByIdAndRemove(req.params.id);

    res.json({ msg: "Pastry removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
