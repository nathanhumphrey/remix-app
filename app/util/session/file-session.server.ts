import path from 'path';
import { createFileSessionStorage } from '@remix-run/node';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const { getSession, commitSession, destroySession } = createFileSessionStorage({
  dir: path.join(__dirname, '../../app/sessions'),
  cookie: {
    name: '__session',
    secrets: [sessionSecret],
    sameSite: true,
  },
});
