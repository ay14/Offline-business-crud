export const replicateBusinesses = (collection) => {
    const syncState = collection.sync({
      remote: 'http://localhost:5400/businesses',
      options: { live: true, retry: true }
    });
  
    syncState.error$.subscribe(err => console.error('Business sync error:', err));
  };
  