import { json } from 'remix';
import { users } from '~/controllers';
import type { LoaderFunction } from 'remix';
import { User } from '~/models';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const op = url.searchParams.get('op');

  switch (op) {
    case 'create':
      // create user
      const user1 = new User('test@example.com', 'guest', 'testid', { theme: 'light' });
      return json(await users.createUser(user1));
      break;
    case 'read':
      // geta a user by username or id
      // return json(await users.getByUsername('admin@example.com'));
      return json(await users.getById('Wv3jQLi5CUUlsBfeiJLOjTta5wWP'));
      break;
    case 'update':
      // update user
      const user2 = new User('test@example.com', 'super', 'testid', { theme: 'dark' });
      return json(await users.updateUser(user2));
      // return null;
      break;
    case 'delete':
      // delete user
      return null;
      break;
    default:
      // execute a custom query
      return json(
        await users.customQuery({
          collection: '', // TODO: find an elegant solution for this
          where: { field: 'role', operator: '==', value: 'guest' },
          limit: { max: 1 },
        })
      );
    // fetch all users
    //users.all());
  }
};
