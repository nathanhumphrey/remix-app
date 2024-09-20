import type { Session } from '@remix-run/node';

/**
 * Base session manager type for authentication requests.
 */
export type AuthSession = {
  /**
   * Returns the current user session object
   * @param {Request} request the resource request
   * @returns {Promise<Session>} Promise object that resolves a Session
   */
  getAuthSession(request: Request): Promise<Session>;
  /**
   * Creates the user session for authentication.
   * @param {object} data the object that represents the user data
   * @param {string} redirectTo the location to redirect to on success
   * @returns {Promise<Response>} Promise object that resolves a Response
   */
  createAuthSession(data: unknown, redirectTo?: string): Promise<Response>;
  /**
   * Destroys or otherwise invalidates the user session.
   * @param {Request} request the resource request
   * @param {strin[] | string} keys the session keys to invalidate
   * @param {string} redirectTo the location to redirect to on success
   * @returns {Promise<Response>} Promise object that resolves a Response
   */
  destroyAuthSession(
    request: Request,
    keys: string[] | string,
    redirectTo?: string
  ): Promise<Response>;
};

/**
 * Base user type for use with AuthInterface implementers.
 * May be extended to support additional properties.
 */
export type AuthUser = {
  /**
   * Unique identifier for a user
   */
  id?: string;
  /**
   * Unique name assigned to a user (typically an email)
   */
  username?: string;
  /**
   * User's password; for sign in and account creation
   */
  password?: string;
  /**
   * Display name for the user
   */
  name?: string;
  /**
   * Assigned role for the user account
   */
  role?: string;
};

/**
 * Auth interface for implementers to adhere to. Implementations are free
 * to determine what types to return, typically a Promise<Response> is
 * appropriate.
 */
export interface Auth<User extends AuthUser> {
  /**
   * Creates a new user account
   * @param {User} user the user account details
   * @param {string} redirectTo the location to redirect to on success
   * @returns {unknown} Typically a Promise object that resolves a Response
   */
  createAccount(user: User, redirectTo?: string): unknown;
  /**
   * Login in a user.
   * @param {User} user the user account details
   * @param {string} redirectTo the location to redirect to on success
   * @returns {unknown} Typically a Promise object that resolves a Response
   */
  login(user: User, redirectTo?: string): unknown;
  /**
   * Logout a user.
   * @param {Request} request the resource request
   * @param {string} redirectTo the location to redirect to on success
   * @returns {unknown} Typically a Promise object that resolves a Response
   */
  logout(request: Request, redirectTo?: string): unknown;
  /**
   * Determines if a user account already exists.
   * @param {User} user the user account details
   * @returns {boolean | Promise<boolean>} true if the user exists, false otherwise
   */
  exists(user: User): boolean | Promise<boolean>;
  /**
   * Ensures that a user is signed in and optionally that the user holds
   * the necessary role for access to a resource.
   * @param {Request} request the resource request
   * @param {string | null} role the role assigned to the user (pass null for unknown)
   * @param {string} redirectTo where to redirect the user if the requirement fails
   * @returns {Promise<Response>} a Promise that resolves a Response
   * @throws {Error} Throws an Error object if the user is not authenticated or lacks the necessary role
   */
  requireUser(request: Request, role?: string | null, redirectTo?: string): unknown;
  /**
   * Returns the currently authenticated user details
   * @param {Request} request the resource request
   * @returns {Promise<AuthUser | null>} a Promise that resolves an AuthUserType object or null
   */
  user(request: Request): Promise<AuthUser | null>;
}
