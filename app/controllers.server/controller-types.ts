/**
 * Abstract DBResult to represent results from any database.
 */
export class DBResult {
  /**
   * Instantiates a new DBResult object.
   * @param {object[]} records? optional initial array of entities for this DB result
   * @param {number} affected? the number of records
   */
  constructor(protected records: object[], protected affected: number = 0) {
    this.records = records || [];
    this.affected = affected || this.records.length;
  }

  /**
   * The number of entities affected in this DB result
   * @returns {number} the number of entities affected in this result
   */
  count(): number {
    return this.affected;
  }
  /**
   * The entities in this DB result
   * @returns {object[]} an arry of entity objects in this result
   */
  rows(): object[] {
    return this.records;
  }
}

/**
 * Represents the type used to define a where/having condition
 */
export type Condition = {
  field: unknown;
  operator: unknown;
  value: unknown;
};

export type OrderByOptions = {
  field: string;
  direction?: 'asc' | 'desc';
};

export type LimitOptions = {
  max: number;
  offset?: number;
};

/**
 * Represents the available query options for the DBInterface
 */
export type QueryOptions = {
  /**
   * The name assigned to the collection of entities (e.g. table name, collection ref, etc.)
   */
  collection: string;
  where?: Condition;
  groupBy?: string;
  orderBy?: OrderByOptions;
  limit?: LimitOptions;
  having?: Condition;
};

/**
 * Required interface for database support in the application.
 */
export interface DB {
  /**
   * Queries the database.
   * @param {QueryOptions} options optional modifiers for the query
   * @returns {DBResult}  A DBResult object
   */
  executeQuery(queryOptions?: QueryOptions): Promise<DBResult>;
  /**
   * Inserts an entity or entities into the database
   * @template Model
   * @param {Model | Model[]} model a generic parameter that represents the desired model or an array of the desired models to insert
   * @param {QueryOptions} queryOptions optional modifiers for the query
   * @returns {DBResult}  A DBResult object
   */
  executeInsert(model: object | object[], queryOptions?: QueryOptions): Promise<DBResult>;
  /**
   * Updates an entity in the database
   * @template Model
   * @param {Model} model a generic parameter that represents the desired model to update
   * @param {QueryOptions} queryOptions optional modifiers for the query
   * @returns {DBResult}  A DBResult object
   */
  executeUpdate(model: object, queryOptions?: QueryOptions): Promise<DBResult>;
  /**
   * Deletes an entity from the database
   * @template Model
   * @param {Model} model a generic parameter that represents the desired model to delete
   * @param {QueryOptions} queryOptions optional modifiers for the query
   * @returns {DBResult}  A DBResult object
   */
  executeDelete(model: object, queryOptions?: QueryOptions): Promise<DBResult>;
}

/**
 * Abstract class for all controllers to extend
 */
export abstract class Controller<ModelData, Model> {
  /**
   * Instantiates a new controller.
   * @param {string} collection the name used to represent the collection of models in the database
   * @param {DB} db the database reference
   */
  constructor(protected collection: string, protected db: DB) {}
  abstract create(modelData: ModelData): Promise<Model>;
  abstract read(options?: QueryOptions): Promise<Model[]>;
  abstract update(modelData: ModelData): Promise<Model | Model[]>;
  abstract delete(modelData: ModelData): Promise<Model | Model[]>;
}
