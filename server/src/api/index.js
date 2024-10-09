const express = require("express");

const boardGames = require("./board-games");
const players = require("./players");
const session = require("./session");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    message: "API - 👋🌎🌍🌏",
  });
});

router.use("/board-games", boardGames);
router.use("/players", players);
router.use("/sessions", session);

module.exports = router;
