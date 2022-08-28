import {IDBPDatabase, IDBPTransaction, openDB, StoreNames} from "idb";

/** Options */
interface IOptions {
    /** Database name */
    name: string,
    /** Store name */
    storeName: string,
    /** Database version */
    version: number
}

export default function createIdbStorage(customOptions: Partial<IOptions> = {}) {
    const options: IOptions = {
        name: 'keyval-store',
        storeName: 'keyval',
        version: 2,

        ...customOptions,
    }

    const dbPromise = openDB(
        options.name,
        options.version,
        {
            upgrade(db: IDBPDatabase<string>, oldVersion: number, newVersion: number | null, tx: IDBPTransaction<string, StoreNames<string>[], "versionchange">) {
                db.createObjectStore(options.storeName)
            }
        }
    )
 

    return {
        /**
         * Get
         */
        async getItem(key: string): Promise<any> {
            const db = await dbPromise

            const tx = db.transaction(options.storeName)

            return tx.objectStore(options.storeName).get(key)
        },

        /**
         * Set
         */
        async setItem(
            key: string,
            item: any
        ): Promise<void> {
            const db = await dbPromise

            const tx = db.transaction(options.storeName, 'readwrite')

            tx.objectStore(options.storeName).put(item, key)

            return tx.done
        },

        /**
         * Remove
         */
        async removeItem(key: string): Promise<void> {
            const db = await dbPromise
            const tx = db.transaction(options.storeName, 'readwrite')

            tx.objectStore(options.storeName).delete(key)

            return tx.done
        },

        /**
         * Get all keys
         */
        async getAllKeys(): Promise<string[]> {
            const db = await dbPromise
            const tx = db.transaction<string>(options.storeName, 'readonly')

            const keys = tx.objectStore(options.storeName).getAllKeys();

            return keys as Promise<string[]>
        },

        /**
         * Get all data
         */
        async getAll(): Promise<any[]> {
            const db = await dbPromise

            const tx = db.transaction(options.storeName)

            return tx.objectStore(options.storeName).getAll()
        },


        async clear(): Promise<void> {
            const db = await dbPromise
            const tx = db.transaction(options.storeName, 'readwrite')

            tx.objectStore(options.storeName).clear()

            return tx.done
        },
    }
}
