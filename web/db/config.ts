import { column, defineDb, defineTable, NOW } from "astro:db";

function addDefaultColumns(column) {
  created_at: column.date({ default: NOW });
  updated_at: column.date({ default: NOW });
  deleted_at: column.date();
}

const Board_Games = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    bbgid: column.number({ optional: true }),
    minplayers: column.number(),
    maxplayers: column.number(),
    bggbestplayers: column.number(),
    played: column.boolean({ default: false }),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});

const Players = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text({ unique: true }),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});

const Game_Sessions = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    board_games_id: column.number({ references: () => Board_Games.columns.id }),
    winner_player_id: column.number({
      references: () => Players.columns.id,
      optional: true,
    }),
    points: column.number(),
    play_date: column.date({ default: NOW }),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});

const Session_Players = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    players_id: column.number({ references: () => Players.columns.id }),
    game_sessions_id: column.number({
      references: () => Game_Sessions.columns.id,
    }),
    player_points: column.number({ optional: true }),
    created_at: column.date({ default: NOW }),
    updated_at: column.date({ default: NOW }),
    deleted_at: column.date({ optional: true }),
  },
});
// https://astro.build/db/config
export default defineDb({
  tables: {
    Board_Games,
    Players,
    Game_Sessions,
    Session_Players,
  },
});
