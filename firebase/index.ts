import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAse-ocg7S3uX-jwACYmsiH2ntp2s2AAE4",
  authDomain: "pre-link.firebaseapp.com",
  projectId: "pre-link",
  storageBucket: "pre-link.appspot.com",
  messagingSenderId: "56591502147",
  appId: "1:56591502147:web:b9e42b68cb3347e8747df6",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
