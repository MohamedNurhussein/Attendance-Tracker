import { db } from "../../src/lib/firebase-admin";
export const handler = async () => {
  //get method
  try {
    //get refrence to clsses node
    const ref = db.ref("classes");

    //get all classes from db
    const snapshot = await ref.get();

    //convert snapshot into an array
    const classes = [];
    snapshot.forEach((childSnapshot) => {
      // const classId = childSnapshot.key;
      const classData = childSnapshot.val();
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
  } catch (error) {
    console.error("getClasses Full error details:", {
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
