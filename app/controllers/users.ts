import { User } from '~/models';
import { AbstractController, DBInterface, QueryOptions } from './controller-types';
import type { DBResult } from './controller-types';

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
   * Creates a new user in the database; requires a username
   * @param {User} user the user model to create in the databas
   * @returns {User} the user model with any updated default|derived field values
   * @throws Will throw an error if username is empty, user already exists, or database call fails
   */
  async createUser(user: User): Promise<User> {
    if (user.getUsername()) {
      if (await this.getByUsername(user.getUsername())) {
        throw Error(`Users/createUser - user already exists`);
      }
      // Default to role guest
      if (!user.getRole()) {
        user.setRole('guest');
      }
      try {
        const result: DBResult = await this.db.executeInsert(
          {
            username: user.getUsername(),
            id: user.getId(),
            role: user.getRole(),
            preferences: user.getPreferences(),
          },
          { collection: this.collection }
        );
        if (result.count() === 1) {
          const u = result.rows().pop();
          return new User(u.username, u?.role, u?.id, u.preferences);
        } // TODO: what if the count is NOT 1?
      } catch (error) {
        throw Error(`Users/createUser - ${error}`);
      }
    }
    throw Error(`Users/createUser - could not create user, missing required field`);
  }

  /**
   * Updates a user in the database; requires an id
   * @param {User} user the user model to update in the database
   * @returns {User | User[]} the user(s) that have been updated
   * @throws Will throw an error if id is empty, user does not exist, or database call fails
   */
  async updateUser(user: User): Promise<User | User[]> {
    if (user.getId()) {
      if (!(await this.getById(user.getId()))) {
        throw Error(`Users/updateUser - no user exists`);
      }

      try {
        const result: DBResult = await this.db.executeUpdate(
          {
            username: user.getUsername(),
            id: user.getId(),
            role: user.getRole(),
            preferences: user.getPreferences(),
          },
          { collection: this.collection, where: { field: 'id', operator: '==', value: user.getId() } }
        );
        if (result.count() === 1) {
          return result.rows().pop();
        } else {
          return result.rows();
        }
      } catch (error) {
        throw Error(`Users/updateUser - ${error}`);
      }
    } else {
      throw Error(`Users/updateUser - could not update user, missing required field`);
    }
  }

  /**
   * Delete a user in the database; requires an id
   * @param {User} user the user model to delete in the database
   * @returns {User | User[]} the user(s) that have been deleted
   * @throws Will throw an error if id is empty, user does not exist, or database call fails
   */
  async deleteUser(user: User): Promise<User | User[]> {
    if (user.getId()) {
      if (!(await this.getById(user.getId()))) {
        throw Error(`Users/deleteUser - no user exists`);
      }

      try {
        const result: DBResult = await this.db.executeDelete(
          {
            id: user.getId(),
          },
          { collection: this.collection, where: { field: 'id', operator: '==', value: user.getId() } }
        );
        if (result.count() === 1) {
          return result.rows().pop();
        } else {
          return result.rows();
        }
      } catch (error) {
        throw Error(`Users/deleteUser - ${error}`);
      }
    } else {
      throw Error(`Users/deleteUser - could not update user, missing required field`);
    }
  }

  /**
   * Get a user by the id.
   * @param {string} id the id of the user to retrieve
   * @returns {User | null} the user retrieved from the database or null if no match was found
   */
  async getById(id: string): Promise<User | null> {
    const record = await this.db.executeQuery({
      collection: this.collection,
      where: { field: 'id', operator: '==', value: id },
    });

    if (record.count() === 1) {
      return record.rows().pop();
    } else {
      return null;
    }
  }

  /**
   * Get a user by the username.
   * @param {string} username the username of the user to retrieve
   * @returns {User | null} the user retrieved from the database or null if no match was found
   */
  async getByUsername(username: string): Promise<User | null> {
    const record = await this.db.executeQuery({
      collection: this.collection,
      where: { field: 'username', operator: '==', value: username },
    });

    if (record.count() === 1) {
      return record.rows().pop();
    } else {
      return null;
    }
  }

  /**
   * Retrieves users from the database.
   * @param {AllUsersFilterType} filter optional filter object (username and/or role) for narrowing the search
   * @returns {User[]} an array of matched users
   */
  async all(filter?: AllUsersFilterType): Promise<User[]> {
    // TODO: update to make use of filter object
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

  async customQuery(options?: QueryOptions): Promise<User[]> {
    const records = await this.db.executeQuery({ ...options, collection: this.collection });
    // Convert the records into the requried User type
    return records.rows().map((record: any) => new User(record.username, record.role, record.id, record.preferences));
  }
}
