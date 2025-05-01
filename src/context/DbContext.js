import { createContext, useContext, useEffect, useState } from "react";
import { initDB } from "../db";

const DbContext = createContext(null);

export const DbProvider = ({ children }) => {
  const [db, setDb] = useState(null);

  useEffect(() => {
    const start = async () => {
      const database = await initDB();
      setDb(database);
    };

    start();
  }, []);

  return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

export const useDb = () => useContext(DbContext);
