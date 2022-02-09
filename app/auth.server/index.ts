import { FileAuth } from './file-auth';
import { FirebaseAuth } from './firebase-auth';
import type {
  AuthInterface,
  AuthSessionType,
  AuthUserType,
} from './auth-types';
import { authSession } from './auth-session';

// init the auth object
// const auth: AuthInterface = new FirebaseAuth(authSession);
const auth: AuthInterface<AuthUserType> = new FileAuth(authSession);

export { auth, AuthInterface, AuthSessionType, AuthUserType };
