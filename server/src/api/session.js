const express = require("express");
const db = require("../db");
const {
  gameSessions,
  sessionPlayers,
  boardGames,
} = require("../../db/tableNames");
const router = express.Router();
const { DateTime } = require("luxon");

// QUERIES
const addGameSession = async (id, session) => {
  try {
    return await db(gameSessions)
      .insert({
        play_date: DateTime.fromISO(session.date).toISODate(),
        winner_player_id: session.winner_player_id,
        points: session.points,
        board_games_id: parseInt(id),
      })
      .returning("id");
  } catch (error) {
    return new Error(error);
  }
};

const addPlayerSession = async (session, gameID) => {
  try {
    session.players.forEach(async (player) => {
      return await db(sessionPlayers)
        .insert({
          players_id: player,
          game_sessions_id: gameID,
        })
        .returning("id");
    });
  } catch (error) {
    return new Error(error);
  }
};

const updateGame = async (gameID) => {
  console.log("updating", gameID);
  try {
    return await db(boardGames).where("id", gameID).update("played", true);
  } catch (error) {
    return new Error(error);
  }
};

const addSession = async (id, session) => {
  // CREATE SESSION WITH INFO
  const gameSession = await addGameSession(id, session);
  console.log(gameSession);
  // RETURN THE SESSION ID AND CREATE SESSION-PLAYERS
  if (gameSession) {
    const gameID = gameSession[0].id;
    try {
      await addPlayerSession(session, gameID);
      await updateGame(id);
    } catch (error) {
      return new Error(error);
    }
  }
};

router.post("/:id", async (req, res, next) => {
  const gamesession = req.body;
  const { id } = req.params;

  try {
    const newSession = addSession(id, gamesession);

    if (newSession) {
      res.json(newSession);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
