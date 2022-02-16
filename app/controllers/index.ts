import { Users } from './users';
import { db } from '~/db';
import { DBResult } from './controller-types';
import type { Condition, DBInterface, LimitOptions, OrderByOptions, QueryOptions } from './controller-types';

/**
 * Initialized users controller
 */
const users: Users = new Users(db);

export { DBResult, users };
export type { Condition, DBInterface, LimitOptions, OrderByOptions, QueryOptions };
