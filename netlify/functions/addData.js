import db from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  try {
    //get data from body
    const { userId, name, email } = JSON.parse(event.body);

    //get refrence to users's data
    const ref = db.ref(`users/${userId}`);

    await ref.set({
      name,
      email,
      role: "student",
    });
    //return a response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("Data added successfully"),
    };
  } catch (error) {
    console.error("addData Full error details:", {
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
