import { db } from '~/firebase';
import { DBResult } from '~/controllers';
import type { Firestore, OrderByDirection, Query, QuerySnapshot } from 'firebase-admin/firestore';
import type { DBInterface, QueryOptions, OrderByOptions } from '~/controllers';

class FirestoreDBResult extends DBResult {}

export class FirestoreDB implements DBInterface {
  constructor(private db: Firestore) {}

  async executeQuery(options: QueryOptions): Promise<FirestoreDBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      let query: Query = collectionRef;

      if (options.where) {
        const w = options.where;
        query = query.where(w.field, w.operator, w.value);
      }
      if (options.orderBy) {
        const o: OrderByOptions = options.orderBy;
        query = query.orderBy(o.field, o?.direction as OrderByDirection);
      }
      if (options.limit) {
        const l = options.limit;
        query = query.limit(l.max);
        if (l.offset) {
          query = query.offset(l.offset);
        }
      }

      const models: any[] = (await query.get()).docs.map((doc) => doc.data());

      return new FirestoreDBResult(models);
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeQuery', error);
    }
    return new FirestoreDBResult([]);
  }

  async executeInsert(model: any, options: QueryOptions): Promise<FirestoreDBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      const inserted = await (await (await collectionRef.add(model)).get()).data();
      return new FirestoreDBResult([inserted]);
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeInsert', error);
    }
    return new FirestoreDBResult([]);
  }

  async executeUpdate(model: any, options: QueryOptions): Promise<FirestoreDBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      const query = collectionRef.where(options.where?.field, options.where?.operator, options.where?.value);
      const docs = await query.get();
      const results = [];

      if (docs.size === 1) {
        docs.docs[0]?.ref.update(model, { exists: true });
        results.push(docs.docs[0]?.data());
      } else if (docs.size > 1) {
        docs.forEach((doc) => {
          doc.ref.update(model, { exists: true });
          results.push(doc.data());
        });
      }
      return new FirestoreDBResult(results);
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeUpdate', error);
    }
    return new FirestoreDBResult([]);
  }

  async executeDelete(model: any, options: QueryOptions): Promise<FirestoreDBResult> {
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
