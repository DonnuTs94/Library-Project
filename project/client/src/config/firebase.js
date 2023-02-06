import { initializeApp } from "firebase/app"
import { getAnalytics } from "firebase/analytics"

const firebaseConfig = {
  apiKey: "AIzaSyB8_p0UYN7SODMHPr4ziSbZr8lg5DAMGt4",
  authDomain: "library-project-auth.firebaseapp.com",
  projectId: "library-project-auth",
  storageBucket: "library-project-auth.appspot.com",
  messagingSenderId: "337771333528",
  appId: "1:337771333528:web:8e018d1a4e9b563a34cded",
  measurementId: "G-P11TQ8YW0M",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
