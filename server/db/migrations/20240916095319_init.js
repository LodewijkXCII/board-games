const Knex = require("knex");

const tableNames = require("../tableNames");

function addDefaultColumns(table) {
  table.timestamps(false, true);
  table.dateTime("deleted_at");
}

function references(table, tabelName, refName) {
  const definition = table
    .integer(`${refName ? refName : tabelName}_id`)
    .unsigned()
    .references("id")
    .inTable(tabelName)
    .onDelete("cascade")
    .notNullable();

  return definition;
}
/** @param {Knex} knex */
exports.up = async (knex) => {
  await Promise.all([
    knex.schema.createTable(tableNames.boardGames, (table) => {
      table.increments().notNullable();
      table.string("name").notNullable();
      table.string("original_name").notNullable();
      table.integer("bggid");
      table.integer("minplayers").notNullable();
      table.integer("maxplayers").notNullable();
      table.string("bggbestplayers").notNullable();
      table.boolean("played").defaultTo(false);
      addDefaultColumns(table);
    }),
    knex.schema.createTable(tableNames.players, (table) => {
      table.increments().notNullable();
      table.string("name").notNullable();
    }),
    knex.schema.createTable(tableNames.gameSessions, (table) => {
      table.increments().notNullable();
      references(table, tableNames.boardGames);
      references(table, tableNames.players, "winner_player");
      table.integer("points");
      table.dateTime("play_date");
    }),
    knex.schema.createTable(tableNames.sessionPlayers, (table) => {
      table.increments().notNullable();
      references(table, tableNames.players);
      references(table, tableNames.gameSessions);
    }),
  ]);
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async (knex) => {
  await Promise.all(
    [
      tableNames.gameSessions,
      tableNames.sessionPlayers,
      tableNames.players,
      tableNames.boardGames,
    ].map((tableName) => knex.schema.dropTableIfExists(tableName))
  );
};
