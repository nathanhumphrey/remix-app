import { cert, initializeApp, getApps, getApp, App, ServiceAccount } from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;
let auth: Auth;
let restApiUrl = '';

/**
 * Required API key for use in REST API to sign in user
 */
const API_KEY: string | undefined = process.env.FIREBASE_WEB_API_KEY;

let db: FirebaseFirestore.Firestore;

if (process.env.NODE_ENV === 'development') {
  app = getApps().length === 0 ? initializeApp({ projectId: 'demo-remix-app' }) : getApp();
  auth = getAuth();
  restApiUrl = `http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=123`;
  db = getFirestore();
} else {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY === undefined) {
    throw Error('Missing FIREBASE_SERVICE_ACCOUNT_KEY');
  }

  const serviceAccount: ServiceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  app = getApps().length === 0 ? initializeApp({ credential: cert(serviceAccount) }) : getApp();
  auth = getAuth();
  restApiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`;
  db = getFirestore();
}
export { app, auth, db, restApiUrl };
