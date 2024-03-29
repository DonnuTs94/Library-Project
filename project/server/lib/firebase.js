const { getAuth } = require("firebase-admin/auth")
const { initializeApp, cert } = require("firebase-admin/app")
const firebaseConfig = require("../config/firebase.json")

initializeApp({
  credential: cert(firebaseConfig),
})

const verifyGoogleToken = async (token) => {
  return await getAuth().verifyIdToken(token)
}

module.exports = {
  verifyGoogleToken,
}
