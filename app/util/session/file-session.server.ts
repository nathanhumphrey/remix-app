import path from 'path';
import { createFileSessionStorage } from 'remix';

const sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  throw new Error('SESSION_SECRET must be set');
}

export const { getSession, commitSession, destroySession } = createFileSessionStorage({
  dir: path.join(__dirname, '../../app/sessions'),
  cookie: {
    name: '__session',
    // normally you want this to be `secure: true`
    // but that doesn't work on localhost for Safari
    // https://web.dev/when-to-use-local-https/
    secure: process.env.NODE_ENV === 'production',
    secrets: [sessionSecret],
    sameSite: 'lax', // to help with CSRF
    path: '/',
    maxAge: 60 * 60 * 24 * 5, // 5 days
    httpOnly: true,
  },
});
