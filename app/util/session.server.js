import { createCookieSessionStorage, json, redirect } from 'remix';
import { auth } from '~/firebase';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

let { getSession, commitSession, destroySession } = createCookieSessionStorage({
  cookie: {
    name: '__session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax', // to help with CSRF
    path: '/',
    maxAge: 60 * 60 * 24 * 5 * 1000,
    httpOnly: true,
  },
});

export function getUserSession(request) {
  return getSession(request.headers.get('Cookie'));
}

export async function createUserSession(user, redirectTo) {
  if (!user.idToken || !user.displayName) {
    return json(
      {
        errorCode: 'session/missing-param',
        errorMessage: 'Missing required session params',
      },
      { status: 422 }
    );
  }
  // expires in 5 days
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  // Create the session cookie. This will also verify the ID token in the process.
  // The session cookie will have the same claims as the ID token.
  // To only allow session cookie setting on recent sign-in, auth_time in ID token
  // can be checked to ensure user was recently signed in before creating a session cookie.
  try {
    const sessionIdToken = await auth.createSessionCookie(user.idToken, {
      expiresIn,
    });
    const session = await getSession();
    session.set('sessionIdToken', sessionIdToken);
    session.set('displayName', user.displayName);

    if (redirectTo) {
      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await commitSession(session),
        },
      });
    } else {
      return json(
        { status: 'success' },
        {
          headers: {
            'Set-Cookie': await commitSession(session),
          },
          status: 201,
        }
      );
    }
  } catch (error) {
    return json(
      {
        errorCode: 'session/create',
        errorMessage: 'Could not create session: ' + error,
      },
      {
        status: 500,
      }
    );
  }
}

export async function requireUser(
  request,
  redirectTo = new URL(request.url).pathname
) {
  const session = await getUserSession(request);
  const tokenId = session.get('sessionIdToken');

  if (!tokenId || typeof tokenId !== 'string') {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]]);
    throw redirect(`/?${searchParams}`);
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(tokenId);
    return decodedClaims;
  } catch (error) {
    return destroyUserSession(request, '/');
  }
}

export async function destroyUserSession(request, redirectTo) {
  const session = await getSession(request.headers.get('Cookie'));
  return redirect(redirectTo, {
    headers: {
      'Set-Cookie': await destroySession(session),
    },
  });
}

export async function getUserName(request) {
  const session = await getUserSession(request);
  const displayName = session.get('displayName');
  if (!displayName || typeof displayName !== 'string') return null;
  return displayName;
}

/*

export async function getUserIdToken(request) {
  const session = await getUserSession(request);
  const tokenId = session.get('sessionIdToken');
  if (!tokenId || typeof tokenId !== 'string') return null;
  return tokenId;
}

export async function getUser(request) {
  const idToken = await getUserIdToken(request);
  if (typeof idToken !== 'string') {
    return null;
  }

  try {
    const { user } = await auth.verifyId(idToken);
    return user;
  } catch {
    throw logout(request);
  }
}

*/

export { getSession, commitSession, destroySession };
