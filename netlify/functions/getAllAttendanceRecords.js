import { timeStamp } from "console";
import db from "../../src/lib/firebase-admin";
export const handler = async () => {
  //get method
  try {
    //get refrence to attendance node
    const attendanceRef = db.ref("/attendance");
    //get refrence to user node
    const usersRef = db.ref("/users");

    //get all attendance records from db
    const attendanceSnapshot = await attendanceRef.once("value");
    //get all user from db
    const usersSnapshot = await usersRef.once("value");

    // Convert users to a map
    const usersMap = {};
    usersSnapshot.forEach((userSnapshot) => {
      usersMap[userSnapshot.key] = userSnapshot.val();
    });

    //convert snapshot into an array
    const records = [];
    attendanceSnapshot.forEach((childSnapshot) => {
      const recordId = childSnapshot.key;
      const recordData = childSnapshot.val();

      //get user's data by userId
      const user = usersMap[recordData.userId];

      //add the record ID to the record object
      records.push({
        id: recordId,
        username: user.name,
        email: user.email,
        date: recordData.date,
        time: recordData.time,
        classId: recordData.classId,
      });
    });
    
    //return a response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "All records retrieved successfully",
        data: records,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error Retrieving all records: ${err}`),
    };
  }
};
