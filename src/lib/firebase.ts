// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDCWyYh33vXHaWEgNxD5TdsJLXsA9T87s0',
  authDomain: 'tech-net-b5864.firebaseapp.com',
  projectId: 'tech-net-b5864',
  storageBucket: 'tech-net-b5864.appspot.com',
  messagingSenderId: '65118102453',
  appId: '1:65118102453:web:fac377a9e704e0e5f1effc',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
