import { User } from '~/models';
import { AbstractController } from './controller-types';
import type { DBResult, QueryOptions } from './controller-types';
import { DBInterface } from '.';

type AllUsersFilterType = {
  username?: string;
  role?: string;
};

/**
 * Controller class for working with User model objects.
 */
export class Users extends AbstractController<User> {
  /**
   * Creates a new Users controller with 'users' collection param
   * @see AbstractController.constructor()
   * @param {DBInterface} db the database reference
   */
  constructor(db: DBInterface) {
    super('users', db);
  }

  /**
   * Creates a new user in the database
   * @param {User} user the user model to create in the databas
   * @returns {User} the user model with any updated default|derived field values
   */
  async createUser(user: User): Promise<User> {
    if (user.getUsername()) {
      // Default to role guest
      if (!user.getRole()) {
        user.setRole('guest');
      }
      try {
        const result: DBResult = await this.db.executeInsert(user);
        if (result.count() === 1) {
          const u = result.rows().pop();
          return new User(u.username, u?.role, u?.id, u.preferences);
        }
      } catch (error) {
        throw Error(`Users/createUser - ${error}`);
      }
    }
    throw Error(`Users/createUser - could not create user, missing required field`);
  }

  async getById(id: string): Promise<User | null> {
    return null;
  }

  getByUsername(username: string) {}

  async all(filter?: AllUsersFilterType): Promise<User[]> {
    const records = await this.db.executeQuery({ collection: this.collection });
    // Convert the records into the requried User type
    return records.rows().map((record: any) => new User(record.username, record.role, record.id, record.preferences));
  }

  /**
   * Facade method for all({ role })
   * @param role the role to filter by
   * @returns
   */
  allByRole(role: string) {
    return this.all({ role });
  }

  /**
   * Facade method for all({ username })
   * @param role the role to filter by
   * @returns
   */
  allByUsername(username: string) {
    return this.all({ username });
  }

  // customQuery(user: User, options?: QueryOptions): Promise<DBRecord<User>> {
  //   return this.db.executeQuery<User>(options);
  // }
}
