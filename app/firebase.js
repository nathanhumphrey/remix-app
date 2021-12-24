import {
  initializeApp,
  applicationDefault,
  getApps,
  getApp,
} from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore'; // new

let app;
let auth;
let db; // new

if (process.env.NODE_ENV === 'development') {
  app =
    getApps().length === 0
      ? initializeApp({ projectId: 'demo-remix-blog-10685' })
      : getApp();
  auth = getAuth();
  db = getFirestore(); // new
} else {
  app =
    getApps().length === 0
      ? initializeApp({ credential: applicationDefault() })
      : getApp();
  auth = getAuth();
  db = getFirestore(); // new
}
export { app, auth, db }; // new
