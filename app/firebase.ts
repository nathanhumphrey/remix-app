import { cert, initializeApp, getApps, getApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

import type { App, ServiceAccount } from 'firebase-admin/app';
import type { Auth } from 'firebase-admin/auth';
import type { Firestore } from 'firebase-admin/firestore';

let app: App;
let auth: Auth;
let restApiSignInUrl = '';
let db: Firestore;

if (process.env.NODE_ENV === 'development') {
  app = getApps().length === 0 ? initializeApp({ projectId: 'demo-remix-app' }) : getApp();
  restApiSignInUrl = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=123`;
} else {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY === undefined) {
    throw Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY');
  }

  if (process.env.FIREBASE_WEB_API_KEY === undefined) {
    throw Error('Missing FIREBASE_WEB_API_KEY');
  }

  const serviceAccount: ServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  app = getApps().length === 0 ? initializeApp({ credential: cert(serviceAccount) }) : getApp();
  restApiSignInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.FIREBASE_WEB_API_KEY}`;
}

auth = getAuth(app);
db = getFirestore(app);

export { app, auth, db, restApiSignInUrl };
