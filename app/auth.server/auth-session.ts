import { json, redirect } from 'remix';
import { getSession, commitSession, destroySession } from '~/util/session';
import type { Session } from 'remix';
import type { AuthSessionType } from '~/auth.server';

const authSession: AuthSessionType = {
  async getAuthSession(request: Request): Promise<Session> {
    return await getSession(request.headers.get('Cookie'));
  },

  async createAuthSession(data: any, redirectTo?: string): Promise<Response> {
    try {
      const session: Session = await getSession();
      for (const key in data) {
        session.set(key, data[key]);
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

  async destroyAuthSession(
    request: Request,
    redirectTo?: string
  ): Promise<any> {
    const session: Session = await getSession(request.headers.get('Cookie'));
    if (redirectTo) {
      return redirect(redirectTo, {
        headers: {
          'Set-Cookie': await destroySession(session),
        },
      });
    } else {
      return json(
        { status: 'success' },
        {
          headers: {
            'Set-Cookie': await destroySession(session),
          },
          status: 204,
        }
      );
    }
  },
};

export { authSession };
