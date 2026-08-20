import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
  projectId: "gen-lang-client-0395069679",
  appId: "1:687938957495:web:478459fa58a008c7939d32",
  apiKey: "AIzaSyBISd0UOT2jhCZnq90VDuKd9tKGhNwIt5k",
  authDomain: "gen-lang-client-0395069679.firebaseapp.com",
  storageBucket: "gen-lang-client-0395069679.firebasestorage.app",
  messagingSenderId: "687938957495",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-cinematicportfol-4fdcd9f4-06f7-41c9-9d5f-0eab5492de78");

export { app, db, doc, setDoc, getDoc, onSnapshot };
