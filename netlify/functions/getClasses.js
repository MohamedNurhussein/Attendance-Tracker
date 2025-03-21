import db from "../../src/lib/firebase-admin";
export const handler = async () => {
  //get method
  try {
    //get refrence to clsses node
    const ref = db.ref("classes");

    //get all classes from db
    const snapshot = await ref.once("value");

    //convert snapshot into an array
    const classes = [];
    snapshot.forEach((childSnapshot) => {
      // const classId = childSnapshot.key;
      // console.log("classId", classId);
      const classData = childSnapshot.val();
      // console.log("classData: ", classData);
      // add the class ID to the class object
      classes.push({
        ...classData,
      });
    });
    //return a response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Classes retrieved successfully",
        data: classes,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error getting classes: ${err}`),
    };
  }
};
