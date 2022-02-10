import { Form, redirect, useLoaderData } from 'remix';
import type { LoaderFunction } from 'remix';
import { auth } from '~/auth.server';

export let meta = () => {
  return {
    title: 'Protected Page',
  };
};

export const loader: LoaderFunction = async ({ request }) => {
  try {
    const authRes: Response = await auth.requireUser(request);
    const status: number = authRes.status;

    if (status === 200) {
      return await auth.user(request);
    }
  } catch (error) {
    return redirect('/');
  }
  return redirect('/');
};

export default function Secrets() {
  const user = useLoaderData();

  return (
    <div className="remix__page">
      <main>
        <h2>Protected Page</h2>
        <p>Hello {user.name}, you must be logged in to view this page.</p>
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      </main>
    </div>
  );
}
