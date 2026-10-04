import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, getFirestore, setLogLevel, Firestore } from 'firebase/firestore';

// Configure Firestore internal logger to prevent unhandled connection retry notices
try {
  setLogLevel('silent');
} catch {
  // Ignored if already configured
}

// Securely load API Key and configuration from environment variables or reliable defaults
const env = import.meta.env;

const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || 'AIzaSyDrj2oqz5889o-YcVMDW-tlHZ0J5BLJRAc',
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || 'responsible-equinox-5f38q.firebaseapp.com',
  projectId: env.VITE_FIREBASE_PROJECT_ID || 'responsible-equinox-5f38q',
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || 'responsible-equinox-5f38q.firebasestorage.app',
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || '205351155749',
  appId: env.VITE_FIREBASE_APP_ID || '1:205351155749:web:70cb88ec05cf557824a7cc',
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID || 'ai-studio-osazeesafetylead-af35cec2-d953-4dee-be4a-5529b6713be2'
};

// Initialize Firebase App singleton
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Cloud Firestore with custom database ID and resilient auto-detect long polling
const firestoreDbId = firebaseConfig.firestoreDatabaseId;

let firestoreInstance: Firestore;
try {
  if (firestoreDbId && firestoreDbId !== '(default)') {
    firestoreInstance = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
    }, firestoreDbId);
  } else {
    firestoreInstance = initializeFirestore(app, {
      experimentalAutoDetectLongPolling: true,
    });
  }
} catch {
  firestoreInstance = firestoreDbId && firestoreDbId !== '(default)'
    ? getFirestore(app, firestoreDbId)
    : getFirestore(app);
}

export const db = firestoreInstance;

// Export database and auth instances
export default app;
