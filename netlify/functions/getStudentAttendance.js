import db from "../../src/lib/firebase-admin";
export const handler = async (event) => {//post method
  try {
    //get userId from body
    const { userId } = JSON.parse(event.body);

    //get refrence to attendance node
    const attendanceRef = db.ref("attendance");
    //create a query to find this user's record
    const userAttendanceQuery = attendanceRef
      .orderByChild("userId")
      .equalTo(userId);

    //get all records for this user
    const snapshot = await userAttendanceQuery.once("value");

    //convert snapshot into an array
    const attendance = [];
    snapshot.forEach((childSnapshot) => {
      const record = childSnapshot.key;
      const recordId = childSnapshot.val();

      //add the attendance ID to the attendance object
      attendance.push({
        id:recordId,
        classId: record.classId,
        date: record.date,
        time: record.time,
      });
    });
    //return a response
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Attendance retrieved successfully",
        data: attendance,
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error adding record: ${err}`),
    };
  }
};
