import { DBResult } from '~/controllers/controller-types';
import { db } from '~/firebase';
import type { Firestore, QuerySnapshot } from 'firebase-admin/firestore';
import type { DBInterface, QueryOptions } from '~/controllers';

class FirestoreDBResult extends DBResult {}

export class FirestoreDB implements DBInterface {
  constructor(private db: Firestore) {}

  async executeQuery(options: QueryOptions): Promise<FirestoreDBResult> {
    const usersRef = db.collection(options.collection);
    let snapshot: QuerySnapshot;

    try {
      if (options.where) {
        const w = options.where;
        snapshot = await usersRef.where(w.field, w.operator, w.value).get();
      } else {
        snapshot = await usersRef.get();
      }
      const models: any[] = snapshot.docs.map((doc) => doc.data());

      return new FirestoreDBResult(models);
    } catch (error) {
      console.error(error);
    }
    return new FirestoreDBResult([]);
  }

  async executeInsert(): Promise<FirestoreDBResult> {
    return new FirestoreDBResult([]);
  }

  async executeUpdate(): Promise<FirestoreDBResult> {
    return new FirestoreDBResult([]);
  }

  async executeDelete(): Promise<FirestoreDBResult> {
    return new FirestoreDBResult([]);
  }

  /**
   * This method provides direct access to the underlying database (Firestore)
   * object. WARNING: making use of the direct databas access feature may impact
   * the interchangeability of databases in your application; use this feature wisely.
   * @returns {FirebaseFirestore.Firestore} the Firestore instance
   */
  getDb(): FirebaseFirestore.Firestore {
    return this.db;
  }
}

export const firestoreDb = new FirestoreDB(db);
