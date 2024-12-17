const express = require("express");
const router = express.Router();
const FavSchema = require("../schema/FavSchema");

router.post("/create", async (req, res, next) => {
  const { username, id, type } = req.body;
  const existingID = await FavSchema.findOne({
    username: username,
    id: id,
    type: type,
  });
  if (existingID) {
    return res.status(400).json("Already Added to Favourites");
  }
  try {
    const newUser = await FavSchema.create({
      username,
      id,
      type,
    });
    return res.json("Added to Favourites");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res) => {
  const username = req.query.username;

  if (!username) {
    return res.status(400).json({ error: "Username parameter is missing" });
  }

  try {
    const filteredData = await FavSchema.find({ username: username });

    res.json(filteredData);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

router.delete("/delete", async (req, res, next) => {
  const { username, id } = req.body;

  try {
    const deletedTask = await FavSchema.findOneAndDelete({
      username: username,
      id: id,
    });

    if (deletedTask) {
      return res.json("Removed Successfully");
    } else {
      return res.status(404).json("Not found");
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/deleteAll", async (req, res, next) => {
  const { username } = req.body;

  try {
    const deletedTask = await FavSchema.deleteMany({
      username: username,
    });

    if (deletedTask) {
      return res.json("Favourites deleted successfully");
    } else {
      return res.status(404).json("Favourites not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
