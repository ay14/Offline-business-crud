import { createRxDatabase } from "rxdb/plugins/core";
import { getRxStorageLocalstorage } from "rxdb/plugins/storage-localstorage";

import { businessSchema } from "./schemas/businessSchema";
import { articleSchema } from "./schemas/articleSchema";
import PouchDB from "pouchdb";
import PouchAdapterIdb from "pouchdb-adapter-idb";
import { UseOnlineStatus } from "../hooks/UseOnlineStatus";
import { replicateBusinesses } from "./sync/SyncBusinessdb";
import { replicateArticles } from "./sync/SyncArticlesdb";

// addRxPlugin(RxDBDevModePlugin);
PouchDB.plugin(PouchAdapterIdb);

export const initDB = async () => {
  try {
    console.log("Initializing RxDB...");
    const isOnline = UseOnlineStatus;

    const db = await createRxDatabase({
      name: "offlinebusiness",
      storage: getRxStorageLocalstorage(),
      multiInstance: true,
      ignoreDuplicate: true,
    });

    await db.addCollections({
      businesses: { schema: businessSchema, sync: true },
      articles: { schema: articleSchema, sync: true },
    });

    if (isOnline) {
      replicateBusinesses(db.businesses);
      replicateArticles(db.articles);
    }

    return db;
  } catch (error) {
    console.error("RxDB initialization failed:", error.stack);
  }
};
