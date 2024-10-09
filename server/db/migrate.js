const db = require("./db.json");

let cleanedData = [];
let expansions = [];

db.forEach(async (game) => {
  if (game.itemtype == "standalone") {
    delete game.itemtype;
  }
  if (game.itemtype == "expansion") {
    return;
  }

  cleanedData.push({
    name: game.objectname,
    original_name: game.originalname,
    minplayers: game.minplayers,
    maxplayers: game.maxplayers,
    bggbestplayers: game.bggbestplayers,
    played: false,
  });
});

module.exports = cleanedData;
