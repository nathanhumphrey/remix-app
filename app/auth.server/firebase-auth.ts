import { Firestore } from 'firebase-admin/firestore';
import { json, redirect } from 'remix';
import { auth } from '~/firebase';
import type { AuthInterface, AuthSessionType } from '.';

// Required for use in REST API to sign in user
const API_KEY: string = process.env.FIREBASE_WEB_API_KEY!;
let URL: string = '';

if (process.env.NODE_ENV === 'development') {
  URL = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=123`;
} else {
  URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
}

export class FirebaseAuth implements AuthInterface {
  constructor(private session: AuthSessionType) {}

  signUp(username: string, password: string): void {
    throw new Error('Method not implemented.');
  }

  async login(username: string, password: string): Promise<any> {
    try {
      const headers: Headers = new Headers();
      headers.append('Content-Type', 'application/json');

      const req: Request = new Request(URL, {
        method: 'post',
        headers,
        body: JSON.stringify({ username, password, returnSecureToken: true }),
      });

      const authResponse: Response = await fetch(req);
      const creds: any = await authResponse.json();

      // expires in 5 days
      const expiresIn: number = 60 * 60 * 24 * 5;
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
      return this.session.createAuthSession({ idToken: sessionIdToken });
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
    this.session.destroyAuthSession(request, redirectTo);
  }

  exists(username: string): boolean {
    throw new Error('Method not implemented.');
  }

  /**
   *
   * @param request
   * @param redirectTo {string} where to redirect the user if the requirement fails
   * @returns
   */
  async requireUser(request: Request, redirectTo: string = '/'): Promise<any> {
    const session = await this.session.getAuthSession(request);
    const tokenId = session.get('sessionIdToken');

    if (!tokenId || typeof tokenId !== 'string') {
      throw redirect(redirectTo);
    }

    try {
      const decodedClaims = await auth.verifySessionCookie(tokenId);
      // TODO: check role claim against parameter
      return decodedClaims;
    } catch (error) {
      return this.session.destroyAuthSession(request, redirectTo);
    }
  }

  user(): any {
    throw Error('Not implemented');
  }
}
