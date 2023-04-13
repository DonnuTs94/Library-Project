import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth"

// apiKey: "AIzaSyB8_p0UYN7SODMHPr4ziSbZr8lg5DAMGt4",
// authDomain: "library-project-auth.firebaseapp.com",
// projectId: "library-project-auth",
// storageBucket: "library-project-auth.appspot.com",
// messagingSenderId: "337771333528",
// appId: "1:337771333528:web:8e018d1a4e9b563a34cded",
// measurementId: "G-P11TQ8YW0M",
///========
// apiKey: "AIzaSyDWHHMsG4RsSwcJ_IvFn5sxZiLdrwjyGDU",
// authDomain: "libraryproject-6cb75.firebaseapp.com",
// projectId: "libraryproject-6cb75",
// storageBucket: "libraryproject-6cb75.appspot.com",
// messagingSenderId: "550492303777",
// appId: "1:550492303777:web:17ed51d69351fb18dfdbe0",
// measurementId: "G-G7HGKDJTSN",

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDWHHMsG4RsSwcJ_IvFn5sxZiLdrwjyGDU",
  authDomain: "libraryproject-6cb75.firebaseapp.com",
  projectId: "libraryproject-6cb75",
  storageBucket: "libraryproject-6cb75.appspot.com",
  messagingSenderId: "550492303777",
  appId: "1:550492303777:web:cb821c9e7b9a5887dfdbe0",
  measurementId: "G-5Y2L7039PR",
}
const app = initializeApp(firebaseConfig)

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account",
})
export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

const analytics = getAnalytics(app)
