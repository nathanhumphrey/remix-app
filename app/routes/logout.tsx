import { redirect } from '@remix-run/node';
import type { ActionFunction, LoaderFunction } from '@remix-run/node';
import { auth } from '~/auth.server';

export const loader: LoaderFunction = async () => {
  // not expecting direct access, so redirect away
  return redirect('/');
};

export const action: ActionFunction = async ({ request }) => {
  return auth.logout(request, '/');
};
