import db from "./db.json";

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
    minplayers: game.minplayers,
    maxplayers: game.maxplayers,
    bggbestplayers: game.bggbestplayers,
    played: false,
  });
});

export default { cleanedData };
