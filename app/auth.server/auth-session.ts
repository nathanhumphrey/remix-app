import { json, redirect } from 'remix';
import { getSession, commitSession } from '~/util/session';
import type { Session } from 'remix';
import type { AuthSessionType } from './auth-types';

/**
 * Implementation of AuthSessionType
 */
export const authSession: AuthSessionType = {
  getAuthSession(request: Request): Promise<Session> {
    return getSession(request.headers.get('Cookie'));
  },

  async createAuthSession(data: any, redirectTo?: string): Promise<Response> {
    try {
      const session: Session = await getSession();

      for (const key in data) {
        if (typeof data[key] === 'string') {
          session.set(key, data[key]);
        } else {
          session.set(key, JSON.stringify(data[key]));
        }
      }

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
          errorMessage: `Could not create user session: ${error}`,
        },
        {
          status: 500,
        }
      );
    }
  },

  async destroyAuthSession(request: Request, keys: string[] | string, redirectTo?: string): Promise<Response> {
    const session: Session = await getSession(request.headers.get('Cookie'));

    if (typeof keys === 'string') {
      session.unset(keys);
    } else {
      keys.forEach((key) => session.unset(key));
    }
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
          status: 204,
        }
      );
    }
  },
};
