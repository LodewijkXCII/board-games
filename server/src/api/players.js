const express = require("express");
const db = require("../db");
const { players } = require("../../db/tableNames");
const router = express.Router();

const find = () => {
  return db(players).select().orderBy("name");
};

router.get("/", async (req, res, next) => {
  try {
    const allPlayers = await find();
    if (allPlayers) {
      res.json(allPlayers);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
