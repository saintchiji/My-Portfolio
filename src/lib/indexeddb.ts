export const initDB = () => {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('CinematicMediaDB', 1);
    
    request.onupgradeneeded = () => {
      request.result.createObjectStore('mediaBlobs', { keyPath: 'id' });
    };
    
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const saveMediaBlob = async (id: string, blob: Blob) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction('mediaBlobs', 'readwrite');
    tx.objectStore('mediaBlobs').put({ id, blob });
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const getMediaBlobUrl = async (id: string): Promise<string | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction('mediaBlobs', 'readonly');
    const request = tx.objectStore('mediaBlobs').get(id);
    
    request.onsuccess = () => {
      if (request.result && request.result.blob) {
        resolve(URL.createObjectURL(request.result.blob));
      } else {
        resolve(null);
      }
    };
    
    request.onerror = () => reject(tx.error);
  });
};

export const deleteMediaBlob = async (id: string) => {
  const db = await initDB();
  return new Promise<void>((resolve, reject) => {
    const tx = db.transaction('mediaBlobs', 'readwrite');
    tx.objectStore('mediaBlobs').delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};
