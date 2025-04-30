import { createRxDatabase } from "rxdb";
import { businessSchema } from "./schemas/businessSchema";
import { articleSchema } from "./schemas/articleSchema";

export const initDB = async () => {
  const db = await createRxDatabase({
    name: "offlinebusiness",
    multiInstance: true,
  });

  await db.collections({
    businesses: { schemas: businessSchema },
    articles: { schemas: articleSchema },
  });

  return db;
};
