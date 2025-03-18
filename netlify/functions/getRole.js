import db from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  try {
    //get userId from body
    const { userId } = JSON.parse(event.body);

    //get refrence to user's data
    const userRef = db.ref(`users/${userId}/userData`);

    //listen for "value" event once and get a snapshot
    const snapshot = await userRef.once("value");
    //get role
    const [name, email, role] = Object.values(snapshot.val());
    //return response
    return {
      statusCode: 200,
      header: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Role Retrieved successfully",
        data: role,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error retrieving role: ${err}`),
    };
  }
};
