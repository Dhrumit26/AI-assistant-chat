

// firebase.js

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// Import other Firebase services if needed (e.g., Analytics)

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC_e8VjTRvZBHGInnKIZ0bfzhODHH4AGaE",
    authDomain: "chatbot-4c0a9.firebaseapp.com",
    projectId: "chatbot-4c0a9",
    storageBucket: "chatbot-4c0a9.appspot.com",
    messagingSenderId: "1003932308747",
    appId: "1:1003932308747:web:924f093a2e7aab50d77e0e",
    measurementId: "G-9KSY9NWHXY"
  };
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const firestore = getFirestore(app);

// Export the initialized app and Firestore
export { app, firestore };

