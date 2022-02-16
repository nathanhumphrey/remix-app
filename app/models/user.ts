type PreferenceType = {
  theme?: string;
};

/**
 * Represents a user in the system.
 */
export class User {
  /**
   * Creates a new User.
   * @param {string} username for the user
   * @param {string} role role for the user
   * @param {string} id unique id for the user
   * @param {PreferenceType} preferences any user preferences
   */
  constructor(
    private username: string = '',
    private role: string = '',
    private id: string = '',
    private preferences?: PreferenceType | null
  ) {
    this.preferences = preferences || null;
  }

  /**
   * Get username
   * @returns {string} the username
   */
  getUsername(): string {
    return this.username;
  }

  /**
   * Set username
   * @param {string} username the new username
   */
  setUsername(username: string): void {
    this.username = username;
  }

  /**
   * Get user rols
   * @returns {string} the user role
   */
  getRole(): string {
    return this.role;
  }

  /**
   * Set user role
   * @param {string} role the new user role
   */
  setRole(role: string): void {
    this.role = role;
  }

  /**
   * Get user id
   * @returns {string} the unique user id
   */
  getId(): string {
    return this.id;
  }

  /**
   * Set user id
   * @param {string} id unique id for the user
   */
  setId(id: string): void {
    this.id = id;
  }

  /**
   * Get user preferences
   * @returns {PreferenceType} a shallow copy of the user preferences
   */
  getPreferences(): PreferenceType {
    return { ...this.preferences };
  }

  /**
   * Set user preferences
   * @param {PreferenceType} prefs preferences for the user
   */
  setPreferences(prefs: PreferenceType): void {
    this.preferences = prefs;
  }
}
