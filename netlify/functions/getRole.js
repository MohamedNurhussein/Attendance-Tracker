import { db } from "../../src/lib/firebase-admin";

export const handler = async (event) => {
  try {
    // Parse the request body
    const { userId } = JSON.parse(event.body);

    // Get reference to user's data
    const userRef = db.ref(`users/${userId}/role`);

    // Get the snapshot
    const snapshot = await userRef.get();

    // Get role
    const role = snapshot.val();

    // Return response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Role Retrieved successfully",
        data: role,
      }),
    };
  } catch (error) {
    console.error("getRole Full error details:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });

    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
    };
  }
};