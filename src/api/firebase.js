import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider,
  signInWithPopup, signOut, updateProfile, signInWithEmailAndPassword,
  onAuthStateChanged, signInWithRedirect} from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

export function register({ email, password, name, photo }) {
  console.log('firebase:register():', email, password);
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      updateProfile(auth.currentUser, {
        displayName: name, photoURL: photo
      })
    })
    .then(() => {logout()})
    .catch(console.error);
}

export function login({ email, password }) {
  console.log('firebase.js:login(): ', email, password);
  signInWithEmailAndPassword(auth, email, password)
    .catch(console.error);
}

export function loginWithGithub() {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
    .catch(console.error);
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  signInWithRedirect(auth, provider)
  // signInWithPopup(auth, provider)
    .catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export function onUserStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const updatedUser = user ? await adminUser(user) : null;
    callback(updatedUser);
  });
}

async function adminUser(user) {
  return get(ref(database, 'admins'))
    .then(snapshot => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return {...user, isAdmin};
      }
      return user;
    });
}


export async function getUserList() {
  console.log('getUserList()');
  return getAuth().listUsers(100)
    .then(result => {
      result.users.map(user => {
        console.log(user.toJSON());
      })
      return result.users
    })
    .catch(console.error);
}
