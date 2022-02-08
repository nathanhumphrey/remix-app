import {
  cert,
  initializeApp,
  getApps,
  getApp,
  App,
  ServiceAccount,
} from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

let app: App;
let auth: Auth;
let db: FirebaseFirestore.Firestore;

if (process.env.NODE_ENV === 'development') {
  app =
    getApps().length === 0
      ? initializeApp({ projectId: 'demo-remix-app' })
      : getApp();
  auth = getAuth();
  db = getFirestore();
} else {
  const serviceAccount: ServiceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_KEY!
  );
  app =
    getApps().length === 0
      ? initializeApp({ credential: cert(serviceAccount) })
      : getApp();
  auth = getAuth();
  db = getFirestore();
}
export { app, auth, db };
