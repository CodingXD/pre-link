import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup } from "firebase/auth";
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

export default async function googleSignup() {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    // ...
  } catch (error: any) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  }
}
