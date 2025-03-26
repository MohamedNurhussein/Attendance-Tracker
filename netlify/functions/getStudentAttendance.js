import { db } from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  //post method
  try {
    //get userId from body
    const { userId } = JSON.parse(event.body);
    if (!event.body || !userId) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(`Body data is required`),
      };
    }
    //get refrence to attendance node
    const attendanceRef = db.ref("/attendance");
    //create a query to find this user's record
    const userAttendanceQuery = attendanceRef
      .orderByChild("userId")
      .equalTo(userId);

    //get all records for this user
    const snapshot = await userAttendanceQuery.get();

    //convert snapshot into an array
    const attendance = [];
    snapshot.forEach((childSnapshot) => {
      const recordID = childSnapshot.key;
      const record = childSnapshot.val();

      //add the attendance ID to the attendance object
      attendance.push({
        recordId: recordID,
        date: record.date,
        time: record.time,
        classId: record.classId,
      });
    });
    //return a response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Attendance retrieved successfully",
        data: attendance,
      }),
    };
  } catch (error) {
    console.error("getStudentAttendance Full error details:", {
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
