import * as firebaseAdmin from "firebase-admin";

if (!firebaseAdmin.apps.length) {
  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.applicationDefault(),
    databaseURL: process.env.DB_URL,
  });
}
const auth = firebaseAdmin.auth();

export { auth };
