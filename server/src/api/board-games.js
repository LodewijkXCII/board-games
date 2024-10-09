const express = require("express");
const db = require("../db");
const { boardGames, gameSessions } = require("../../db/tableNames");
const router = express.Router();

// QUERIES
const find = () => {
  return db(boardGames)
    .from("board_games as bg")

    .select("bg.*", db.raw("COUNT(gs.id) AS session_count"))
    .leftJoin("game_sessions as gs", "bg.id", "gs.board_games_id")
    .whereNull("bg.deleted_at")
    .groupBy("bg.id")
    .orderBy("bg.name");
};

const findOne = (id) => {
  return db(boardGames)
    .from("board_games as bg")

    .select("bg.*", db.raw("COUNT(gs.id) AS session_count"))
    .leftJoin("game_sessions as gs", "bg.id", "gs.board_games_id")
    .whereNull("bg.deleted_at")
    .groupBy("bg.id")
    .orderBy("bg.name")
    .where("bg.id", id)
    .first();
};

const createGame = (gameData) => {
  return db(boardGames)
    .insert({
      ...gameData,

      played: false,
    })
    .returning("id");
};

router.get("/", async (req, res, next) => {
  try {
    const allBoardGames = await find();

    if (allBoardGames) {
      res.json(allBoardGames);
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/:gameID", async (req, res, next) => {
  const { gameID } = req.params;
  try {
    const getOneBoardGame = await findOne(gameID);

    if (getOneBoardGame) {
      res.json(getOneBoardGame);
    }
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  const formData = req.body;

  console.log(formData);
  try {
    const newGame = await createGame(formData);

    if (newGame) {
      res.json(newGame);
    }
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
