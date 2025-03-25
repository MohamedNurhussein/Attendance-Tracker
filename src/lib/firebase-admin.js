import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    let privateKey = process.env.FIREBASE_PRIVATE_KEY;
    if (privateKey) {
      // More robust private key handling
      privateKey = privateKey
        .replace(/\\n/g, "\n")  // Replace escaped newlines
        .replace(/^"/, '')       // Remove leading quote if exists
        .replace(/"$/, '');      // Remove trailing quote if exists
    }

    // Validate required environment variables
    if (!process.env.FIREBASE_PROJECT_ID) {
      throw new Error("FIREBASE_PROJECT_ID is not set");
    }
    if (!privateKey) {
      throw new Error("FIREBASE_PRIVATE_KEY is not set");
    }
    if (!process.env.FIREBASE_CLIENT_EMAIL) {
      throw new Error("FIREBASE_CLIENT_EMAIL is not set");
    }
    if (!process.env.FIREBASE_DATABASE_URL) {
      throw new Error("FIREBASE_DATABASE_URL is not set");
    }

    // Initialize the app
    admin.initializeApp({
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