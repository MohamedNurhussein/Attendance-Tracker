import admin from "firebase-admin";
if (!admin.apps.length) {
  try {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      // Replace both \\n and \n with actual newlines
      privateKey = privateKey.replace(/\\n/g, "\n");
      // Also handle the case where the key might be surrounded by quotes
      privateKey = privateKey.slice(1, -1);
    }
    // Initialize the app
    admin.initializeApp({
      // credential: admin.credential.cert(serviceAccount),
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: privateKey,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      }),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
    console.log("Firebase Admin initialized successfully");
  } catch (error) {
    console.error("Firebase Admin initialization error:", error);
    // Re-throw the error so calling code can handle it
    throw new Error(`Firebase initialization failed: ${error.message}`);
  }
}
const db = admin.database();
export default db;
