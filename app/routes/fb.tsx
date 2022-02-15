import { json, LoaderFunction } from 'remix';
import { users } from '~/controllers';
export const loader: LoaderFunction = async () => {
  return json(await users.all());
};
