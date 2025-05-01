export const replicateBusinesses = (collection) => {
  const syncUrl = import.meta.env.REACT_APP_MONGO_DB_URL

    const syncState = collection.sync({
      remote: syncUrl,
      options: { live: true, retry: true }
    });
  
    syncState.error$.subscribe(err => console.error('Business sync error:', err));
  };
  