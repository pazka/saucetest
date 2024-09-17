export const saveIndexDbPersistentData = async (key: string, data: any) => {
    return new Promise((resolve, reject) => {
        const db = indexedDB.open('sauce', 1);

        db.onupgradeneeded = (event: any) => {
            try {
                const db = event.target.result;
                console.log('upgrade needed', db);
                db.createObjectStore('persisted_data');
            } catch (e) {
                console.error(e);
            }
        }

        db.onsuccess = (event: any) => {
            const db = event.target.result;
            const transaction = db.transaction('persisted_data', 'readwrite');
            const store = transaction.objectStore('persisted_data');
            store.put(data, key);
            resolve(true);
        }

        db.onerror = (event: any) => {
            console.error(event.target.error);
            reject(event.target.error);
        }
    });

}

export const getIndexDbPersistentData = async (key: string) => {
    return new Promise((resolve, reject) => {
        const db = indexedDB.open('sauce', 1);

        db.onupgradeneeded = (event: any) => {
            try {
                const db = event.target.result;
                console.log('upgrade needed', db);
                db.createObjectStore('persisted_data');
            } catch (e) {
                console.error(e);
            }
        }

        db.onsuccess = (event: any) => {
            const db = event.target.result;
            const transaction = db.transaction('persisted_data', 'readwrite');
            const store = transaction.objectStore('persisted_data');
            const request = store.get(key);

            request.onsuccess = () => {
                resolve(request.result);
            }
        }

        db.onerror = (event: any) => {
            console.error(event.target.error);
            reject(event.target.error);
        }
    });
}

