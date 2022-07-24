import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPK_RToJKWz5eV3HCuD_FqybHpVtSq86M",
  authDomain: "fomoexchange.firebaseapp.com",
  projectId: "fomoexchange",
  storageBucket: "fomoexchange.appspot.com",
  messagingSenderId: "447714526517",
  appId: "1:447714526517:web:3bf270185601ddca71f87c",
  measurementId: "G-T0VE828GZS",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
