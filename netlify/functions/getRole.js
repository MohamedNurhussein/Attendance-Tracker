import db from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  try {
    // Log environment variable existence
    // console.log("Firebase Admin initialized:", !!admin.apps.length);
    //get userId from body
    const { userId } = JSON.parse(event.body);

    //get refrence to user's data
    const userRef = db.ref(`users/${userId}/role`);

    //listen for "value" event once and get a snapshot
    const snapshot = await userRef.once("value");
    //get role
    const role = snapshot.val();

    //return response
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
