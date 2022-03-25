import { FileAuth } from './file-auth';
import { FirebaseAuth } from './firebase-auth';
import { authSession } from './auth-session';
import type { Auth, AuthUser } from './auth-types';

/**
 * Initialized auth object
 */
const auth: Auth<AuthUser> = new FirebaseAuth(authSession);
// const auth: AuthInterface<AuthUserType> = new FileAuth(authSession);

export { auth };
