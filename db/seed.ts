import { db, Board_Games, Players } from "astro:db";
import games from "./migrate";

// https://astro.build/db/seed
export default async function seed() {
  await db.insert(Players).values([
    { id: 1, name: "Kasim" },
    { id: 2, name: "Mina" },
  ]);

  games.cleanedData.forEach(async (game) => {
    await db.insert(Board_Games).values(game);
  });
}
