import { Users } from './users';
import { db } from '~/db';
import type { DBInterface, QueryOptions } from './controller-types';

/**
 * Initialized users controller
 */
const users: Users = new Users(db);

export { users };
export type { DBInterface, QueryOptions };
