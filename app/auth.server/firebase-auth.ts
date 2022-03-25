import { DecodedIdToken } from 'firebase-admin/auth';
import { json, redirect } from 'remix';
import { auth, restApiSignInUrl } from '~/firebase';
import { AppError } from '~/util';
import type { Auth, AuthSession, AuthUser } from './auth-types';

/**
 * Firebase implementation of Auth Interface
 */
export class FirebaseAuth implements Auth<AuthUser> {
  constructor(private session: AuthSession) {}

  async createAccount(user: AuthUser, redirectTo?: string): Promise<Response> {
    if (!user?.username || !user?.password) {
      return json<AppError>(
        {
          status: 'error',
          errorCode: 'auth/createAccount',
          errorMessage: `Could not create the account - missing params`,
        },
        {
          status: 422,
        }
      );
    }

    try {
      const newUser = await auth.createUser({ email: user.username, password: user.password });
      if (redirectTo) {
        return redirect(redirectTo);
      } else {
        return json(
          { status: 'success', user: newUser },
          {
            status: 201,
          }
        );
      }
    } catch (error) {
      throw json<AppError>(
        {
          status: 'error',
          errorCode: 'auth/createAccount',
          errorMessage: `Could not create the account - ${error}`,
        },
        {
          status: 500,
        }
      );
    }
  }

  async login(user: AuthUser): Promise<Response> {
    if (!user?.username || !user?.password) {
      return json<AppError>(
        {
          status: 'error',
          errorCode: 'auth/login',
          errorMessage: `Could not login - missing params`,
        },
        {
          status: 422,
        }
      );
    }

    try {
      const headers: Headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const req: Request = new Request(restApiSignInUrl, {
        method: 'post',
        headers,
        body: JSON.stringify({
          email: user.username,
          password: user.password,
          returnSecureToken: true,
        }),
      });
      const authResponse: Response = await fetch(req);
      const credentials: any = await authResponse.json();

      // check for error
      if (credentials.error) {
        return json(
          {
            status: 'error',
            errorCode: 'auth/login',
            errorMessage: `Invalid username or password`,
          },
          {
            status: 422,
          }
        );
      }

      // get the user to retrieve any custom claims (e.g. role)
      const firebaseUser = await auth.getUser(credentials.localId);

      // expires in 5 days
      const expiresIn: number = 60 * 60 * 24 * 5 * 1000;

      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      // To only allow session cookie setting on recent sign-in, auth_time in ID token
      // can be checked to ensure user was recently signed in before creating a session cookie.
      const sessionIdToken: string = await auth.createSessionCookie(credentials.idToken, {
        expiresIn,
      });

      const sessionUser: AuthUser = {
        id: firebaseUser.uid,
        username: firebaseUser.email,
        name: firebaseUser.displayName,
        role: firebaseUser.customClaims?.role,
      };

      return this.session.createAuthSession({
        idToken: sessionIdToken,
        user: sessionUser,
      });
    } catch (error) {
      // TODO: look into a modular logging package
      console.error('auth/login', `Could not create the session cookie - ${error}`);
      return json<AppError>(
        {
          status: 'error',
          errorCode: 'auth/login',
          errorMessage: `There was a problem logging in`,
        },
        {
          status: 500,
        }
      );
    }
  }

  logout(request: Request, redirectTo = '/'): Promise<Response> {
    return this.session.destroyAuthSession(request, ['idToken', 'user'], redirectTo);
  }

  async exists(user: AuthUser): Promise<boolean> {
    try {
      if (await auth.getUserByEmail(user.username)) {
        return true;
      }
    } catch (error) {
      throw json<AppError>(
        {
          status: 'exception',
          errorCode: 'auth/exists',
          errorMessage: `Could not check for account - ${error}`,
        },
        { status: 500 }
      );
    }

    return false;
  }

  async requireUser(request: Request, role: string | null = null, redirectTo?: string): Promise<Response> {
    const session = await this.session.getAuthSession(request);
    const sessionIdToken = session.get('idToken');
    let decodedClaims: DecodedIdToken;

    if (sessionIdToken && typeof sessionIdToken === 'string') {
      try {
        decodedClaims = await auth.verifySessionCookie(sessionIdToken);
      } catch (error) {
        // Failed verification (e.g. Firebase session cookie revoked) -> unset session vars
        throw await this.session.destroyAuthSession(request, ['idToken', 'user'], redirectTo ? redirectTo : undefined);
      }

      if (!role || role === decodedClaims?.role) {
        return json(
          { status: 'success' },
          {
            status: 200,
          }
        );
      }
    }

    if (redirectTo) {
      throw redirect(redirectTo);
    } else {
      throw json<AppError>(
        {
          status: 'error',
          errorCode: 'auth/requireUser',
          errorMessage: `Unauthorized access`,
        },
        {
          status: 401,
        }
      );
    }
  }

  async user(request: Request): Promise<AuthUser | null> {
    const session = await this.session.getAuthSession(request);
    const user: AuthUser = JSON.parse(session.get('user') || null);
    return user;
  }
}
