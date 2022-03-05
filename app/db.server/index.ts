import type { DBInterface } from '~/controllers.server';
import { firestoreDb } from './firestore-db';

/**
 * Initialized database interface object
 */
const db: DBInterface = firestoreDb;

export { db };
