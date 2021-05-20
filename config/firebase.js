import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCm8iENQ_5yGp5dP-jNxYRr22odW3fTWQ4',
  authDomain: 'nativesigninredirect.firebaseapp.com',
  projectId: 'nativesigninredirect',
  storageBucket: 'nativesigninredirect.appspot.com',
  messagingSenderId: '308364116212',
  appId: '1:308364116212:web:c14ed14db98c743aa79ea1',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
