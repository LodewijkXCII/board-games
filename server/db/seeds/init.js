const Knex = require("knex");

const tableNames = require("../tableNames");
const games = require("../migrate");

/** @param {Knex} knex */
exports.seed = async (knex) => {
  console.log(games);
  // Deletes ALL existing entries
  await knex(tableNames.boardGames).del();
  await knex(tableNames.players).del();
  await knex(tableNames.gameSessions).del();
  await knex(tableNames.sessionPlayers).del();

  await knex(tableNames.boardGames).insert(games, "*");
  await knex(tableNames.players).insert([
    { name: "Loek" },
    { name: "Nicolien" },
    { name: "Annemijn" },
  ]);
};
