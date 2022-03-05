import { json } from 'remix';
import { users } from '~/controllers.server';
import type { LoaderFunction } from 'remix';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const op = url.searchParams.get('op');

  let user;

  switch (op) {
    case 'create':
      // create user
      user = { id: 'testid', username: 'test@example.com', role: 'guest', preferences: { theme: 'dark' } };
      return json(await users.create(user));
      break;
    case 'read':
      // geta a user by username or id
      // return json(await users.getByUsername('admin@example.com'));
      return json(await users.getById('Wv3jQLi5CUUlsBfeiJLOjTta5wWP'));
      break;
    case 'update':
      // update user
      user = { id: 'testid', role: 'admin', preferences: { theme: 'light' } };
      return json(await users.update(user));
      // return null;
      break;
    case 'delete':
      // delete user
      user = { id: 'testid' };
      return json(await users.delete(user));
      break;
    default:
      // execute a custom query
      // return json(
      //   await users.read({
      //     collection: '', // TODO: find a more _elegant_ solution for this
      //     where: { field: 'role', operator: '!=', value: 'super' },
      //     limit: { max: 2 },
      //   })
      // );
      // fetch all users by role
      return json(await users.allByRole('admin'));
  }
};
