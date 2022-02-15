import type { DBInterface } from '~/controllers';
import { firestoreDb } from './firestore-db';

/**
 * Initialized database interface object
 */
const db: DBInterface = firestoreDb;

export { db };
