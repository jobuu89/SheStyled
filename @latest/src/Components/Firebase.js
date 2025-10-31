import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDl854XPd63n4WKrWEG5T_joHTJ0Ab0CpY",
  authDomain: "shestyled-cd8da.firebaseapp.com",
  projectId: "shestyled-cd8da",
  storageBucket: "shestyled-cd8da.firebasestorage.app",
  messagingSenderId: "391472150469",
  appId: "1:391472150469:web:b598a9bc34592f21a4fdac",
  measurementId: "G-77QS6R4PBE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

export default app;
