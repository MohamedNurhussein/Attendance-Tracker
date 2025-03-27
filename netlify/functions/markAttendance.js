import { db } from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  //post
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify("body is required"),
      };
    }
    //get userId, date, time, classId from body
    const { userId, classId } = JSON.parse(event.body);
    
    //get timestamp
    const now = new Date();
    const formatedDate = now.toLocaleDateString();
    const formatedTime = now.toLocaleTimeString();
    const [hour, minute] = formatedTime.split(":");

    //get refrence to attendance node
    const attendanceRef = db.ref("/attendance"); //attendance

    const newRecRef = attendanceRef.push();
    await newRecRef.set({
      userId: userId,
      date: formatedDate,
      time: hour + ":" + minute,
      classId: classId,
    });
    //return a response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Record added successfully",
      }),
    };
  } catch (error) {
    console.error("markAttendance Full error details:", {
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
