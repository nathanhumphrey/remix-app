import { redirect } from 'remix';
import { destroyUserSession } from '~/util/session.server';

export const loader = async () => {
  // not expecting direct access, so redirect away
  return redirect('/');
};

export const action = async ({ request }) => {
  return destroyUserSession(request, '/');
};
