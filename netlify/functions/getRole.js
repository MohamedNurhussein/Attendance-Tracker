import db from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  try {
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
  } catch (err) {
    console.error("on get role: ", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error retrieving role: ${err}`),
    };
  }
};
