import { User } from '~/models';
import { AbstractController, DBInterface, QueryOptions } from './controller-types';
import type { DBResult } from './controller-types';

type UserType = {
  id: string;
  username: string;
  role: string;
  preferences: object;
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
  async create(user: User): Promise<User> {
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
          const u = result.rows().pop() as UserType;
          return new User(u.username, u?.role, u?.id, u.preferences);
        } // TODO: what if the count is NOT 1? ... it shouldn't be, but ...
      } catch (error) {
        throw Error(`Users/createUser - ${error}`);
      }
    }
    throw Error(`Users/createUser - could not create user, missing required field`);
  }

  /**
   * Provides a way to submit a custom users query to the database.
   * @param {QueryOptions} options query options
   * @returns {User[]} an array of matched users
   */
  async read(options?: QueryOptions): Promise<User[]> {
    const records = await this.db.executeQuery({ ...options, collection: this.collection });
    // Convert the records into the requried User type
    return records.rows().map((record) => {
      const u = record as UserType;
      return new User(u.username, u.role, u.id, u.preferences);
    });
  }

  /**
   * Updates a user in the database; requires an id
   * @param {User} user the user model to update in the database
   * @returns {User | User[]} the user(s) that have been updated
   * @throws Will throw an error if id is empty, user does not exist, or database call fails
   */
  async update(user: User): Promise<User | User[]> {
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

        const users = result.rows().map((record) => {
          const u = record as UserType;
          return new User(u.username as string, u.role, u.id, u.preferences);
        });
        if (result.count() === 1) {
          return users.pop() as User;
        } else {
          return users;
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
  async delete(user: User): Promise<User | User[]> {
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
        const users = result.rows().map((record) => {
          const u = record as UserType;
          return new User(u.username as string, u.role, u.id, u.preferences);
        });
        if (result.count() === 1) {
          return users.pop() as User;
        } else {
          return users;
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
    const result = await this.db.executeQuery({
      collection: this.collection,
      where: { field: 'id', operator: '==', value: id },
    });

    if (result.count() === 1) {
      const u = result.rows().pop() as UserType;
      return new User(u.username as string, u.role, u.id, u.preferences);
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
    const result = await this.db.executeQuery({
      collection: this.collection,
      where: { field: 'username', operator: '==', value: username },
    });

    if (result.count() === 1) {
      const u = result.rows().pop() as UserType;
      return new User(u.username as string, u.role, u.id, u.preferences);
    } else {
      return null;
    }
  }

  /**
   * Facade method for all({ role })
   * @param role the role to filter by
   * @returns
   */
  allByRole(role: string) {
    return this.read({ collection: this.collection, where: { field: 'role', operator: '==', value: role } });
  }
}
