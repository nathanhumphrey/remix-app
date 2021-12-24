import { Form, useLoaderData } from 'remix';
import { requireUser } from '~/util/session.server';
import { db } from '~/firebase';

export const loader = async ({ request }) => {
  const user = await requireUser(request, '/');

  const secrets = await db.doc('secrets/first-secret');
  const snap = await secrets.get();

  return { user, data: snap.data() };
};

export let meta = () => {
  return {
    title: 'Remix Secrets App - Secrets Page',
  };
};

export default function Secrets() {
  const { user, data } = useLoaderData();

  return (
    <div className="remix__page">
      <main>
        <h2>Remix Secrets</h2>
        <p>
          Hello {user.name}, your {data.title} will appear here.
        </p>
        <Form method="post" action="/logout">
          <button>Logout</button>
        </Form>
      </main>
    </div>
  );
}
