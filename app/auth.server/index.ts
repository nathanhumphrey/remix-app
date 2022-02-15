import { FileAuth } from './file-auth';
import { FirebaseAuth } from './firebase-auth';
import { authSession } from './auth-session';
import type { AuthInterface, AuthUserType } from './auth-types';

/**
 * Initialized auth object
 */
const auth: AuthInterface<AuthUserType> = new FirebaseAuth(authSession);
// const auth: AuthInterface<AuthUserType> = new FileAuth(authSession);

export { auth };
