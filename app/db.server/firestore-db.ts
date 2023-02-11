import { db } from '~/firebase';
import { DBResult } from '~/controllers.server';
import type { DocumentData, Firestore, OrderByDirection, Query, WhereFilterOp } from 'firebase-admin/firestore';
import type { DB, QueryOptions, OrderByOptions } from '~/controllers.server';

export class FirestoreDB implements DB {
  constructor(private db: Firestore) {}

  async executeQuery(options: QueryOptions): Promise<DBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      let query: Query = collectionRef;

      if (options.where) {
        const w = options.where;
        query = query.where(w.field as string, w.operator as WhereFilterOp, w.value);
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

      const models: object[] = (await query.get()).docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });

      return new DBResult(models);
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeQuery', error);
    }
    return new DBResult([]);
  }

  async executeInsert(model: any, options: QueryOptions): Promise<DBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      let inserted: DocumentData | undefined;

      if (Object.getOwnPropertyDescriptor(model, 'id')) {
        inserted = await collectionRef.doc(model['id']).set(model);
      } else {
        inserted = (await (await collectionRef.add(model)).get()).data();
      }

      if (inserted) {
        return new DBResult([inserted]);
      } else {
        return new DBResult([]);
      }
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeInsert', error);
    }
    return new DBResult([]);
  }

  async executeUpdate(model: any, options: QueryOptions): Promise<DBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      const query = collectionRef.where(
        options.where?.field as string,
        options.where?.operator as WhereFilterOp,
        options.where?.value
      );
      const docs = await query.get();
      const results: object[] = [];

      if (docs.size > 0) {
        await docs.forEach(async (doc) => {
          doc.ref.update(model);
          // hack to deal with Firestore's lack of 'return updated/deleted document'
          results.push({ ...doc.data(), ...model });
        });
      }

      return new DBResult(results);
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeDelete', error);
    }
    return new DBResult([]);
  }

  async executeDelete(model: any, options: QueryOptions): Promise<DBResult> {
    try {
      const collectionRef = db.collection(options.collection);
      const query = collectionRef.where(
        options.where?.field as string,
        options.where?.operator as WhereFilterOp,
        options.where?.value
      );
      const docs = await query.get();
      const results: object[] = [];

      if (docs.size > 0) {
        await docs.forEach((doc) => {
          doc.ref.delete({ exists: true });
          results.push(doc.data());
        });
      }
      return new DBResult(results);
    } catch (error) {
      // TODO: update error logging
      console.error('firestoreDB/executeDelete', error);
    }
    return new DBResult([]);
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
