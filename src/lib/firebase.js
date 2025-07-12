import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

// Firebase configuration - Using demo project for development
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForSahayakProject123456789",
  authDomain: "sahayak-ai-assistant.firebaseapp.com",
  projectId: "sahayak-ai-assistant",
  storageBucket: "sahayak-ai-assistant.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456789012"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

// For development, we'll use a mock authentication system
// In production, replace with actual Firebase project credentials

export default app;

