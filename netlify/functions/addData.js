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
      role: "student"
    });
    //return a response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("Data added successfully"),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error adding data: ${err}`),
    };
  }
};
