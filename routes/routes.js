const express = require("express");
const Pastry = require('../models/pastry');
const { check, validationResult } = require('express-validator');

const router = express.Router();

// @route   GET api/pastry
// @desc    Get All Pastries
// @access  Public
router.get("/", async (req, res) => {
  try {
    const pastry = await Pastry.find();
    res.json(pastry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/pastries
// @desc    Create an Pastry
// @access  Public
router.post(
  "/",
  /* [check("name", "Name is required").not().isEmpty()], */
  async (req, res) => {
    /* const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    */

    const { name, price, quantity } = req.body;

    try {
      const newPastry = new Pastry({name, price, quantity});

      const pastry = await newPastry.save();

      res.json(pastry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   PUT api/items/:id
// @desc    Update an Item
// @access  Public
/* router.put("/:id", async (req, res) => {
  const { name } = req.body;

  // Build item object
  const itemFields = {};
  if (name) itemFields.name = name;

  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    item = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: itemFields },
      { new: true }
    );

    res.json(item);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); */

// @route   DELETE api/items/:id
// @desc    Delete an Item
// @access  Public
/* router.delete("/:id", async (req, res) => {
  try {
    let item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ msg: "Item not found" });

    await Item.findByIdAndRemove(req.params.id);

    res.json({ msg: "Item removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
}); */

module.exports = router;
