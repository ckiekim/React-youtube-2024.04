import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider,
  signInWithPopup, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

export async function register({ email, password }) {
  console.log('firebase:register():', email, password);
  return createUserWithEmailAndPassword(auth, email, password)
    .then(result => result.user)
    .catch(console.error);
}

export async function loginWithGithub() {
  const provider = new GithubAuthProvider();
  return signInWithPopup(auth, provider)
    .then(result => result.user)
    .catch(console.error);
}

export async function logout() {
  return signOut(auth)
    .then(() => null)
    .catch(console.error);
}