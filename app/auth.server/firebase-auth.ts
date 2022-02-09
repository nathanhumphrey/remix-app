import { json, redirect } from 'remix';
import { auth } from '~/firebase';
import type { AuthInterface, AuthSessionType, AuthUserType } from '.';

// Required for use in REST API to sign in user
const API_KEY: string = process.env.FIREBASE_WEB_API_KEY!;
let URL: string = '';

if (process.env.NODE_ENV === 'development') {
  URL = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=123`;
} else {
  URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
}

export class FirebaseAuth implements AuthInterface<AuthUserType> {
  constructor(private session: AuthSessionType) {}

  createAccount(user: AuthUserType): void {
    throw new Error('createAcount: Method not implemented.');
  }

  async login(user: AuthUserType): Promise<any> {
    try {
      const headers: Headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const req: Request = new Request(URL, {
        method: 'post',
        headers,
        body: JSON.stringify({
          email: user.username,
          password: user.password,
          returnSecureToken: true,
        }),
      });

      const authResponse: Response = await fetch(req);
      const creds: any = await authResponse.json();
      // get the user to retrieve any custom claims (e.g. role)
      const firebaseUser = await auth.getUser(creds.localId);
      // expires in 5 days
      const expiresIn: number = 60 * 60 * 24 * 5 * 1000;
      // Create the session cookie. This will also verify the ID token in the process.
      // The session cookie will have the same claims as the ID token.
      // To only allow session cookie setting on recent sign-in, auth_time in ID token
      // can be checked to ensure user was recently signed in before creating a session cookie.

      const sessionIdToken: string = await auth.createSessionCookie(
        creds.idToken,
        {
          expiresIn,
        }
      );

      // now create the session
      const sessionUser: AuthUserType = {
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
      return json(
        {
          status: 'error',
          errorCode: 'auth/login',
          errorMessage: `Could not create the session cookie - ${error}`,
        },
        {
          status: 422,
        }
      );
    }
  }

  logout(request: Request, redirectTo: string): any {
    return this.session.destroyAuthSession(
      request,
      ['idToken', 'user'],
      redirectTo
    );
  }

  exists(user: AuthUserType): boolean {
    throw new Error('exists: Method not implemented.');
  }

  /**
   *
   * @param request
   * @param redirectTo {string} where to redirect the user if the requirement fails
   * @returns
   */
  async requireUser(request: Request, role?: string): Promise<any> {
    if ((await this.user(request)) !== null) {
      // update to also check role claim if required
      if (true) {
        return json(
          { status: 'success' },
          {
            status: 200,
          }
        );
      }
    }
    return json(
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

  async user(request: Request): Promise<AuthUserType | null> {
    const session = await this.session.getAuthSession(request);
    const idToken = session.get('idToken');
    const user: AuthUserType = JSON.parse(session.get('user') || null);

    if (!idToken || typeof idToken !== 'string') {
      // throw will cause the error bondary to be hit, think about this
      // throw await this.session.destroyAuthSession(request);
      return null;
    }

    // TODO: check role claim against parameter
    if (!user) {
      return null;
    }

    try {
      await auth.verifySessionCookie(idToken);
      return user;
    } catch (error) {
      // TODO: find a way to display an expiry message to user
      // to test, update expires time above
      throw this.session.destroyAuthSession(request, ['idToken', 'user'], '/');
    }
  }
}
