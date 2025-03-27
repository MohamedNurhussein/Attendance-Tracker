import { db } from "../../src/lib/firebase-admin";

export const handler = async (event) => {
  try {
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify("body is required"),
      };
    }

    // Get userId and classId from body
    const { userId, classId } = JSON.parse(event.body);
    
    // Create a date object for Egypt timezone
    const egyptTime = new Date().toLocaleString('en-US', { 
      timeZone: 'Africa/Cairo',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false 
    });

    // Split the time to get hours and minutes
    const [hours, minutes] = egyptTime.split(':');

    // Format date in Egypt timezone
    const formatedDate = new Date().toLocaleString('en-GB', { 
      timeZone: 'Africa/Cairo',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });

    // Reference to attendance node
    const attendanceRef = db.ref("/attendance");

    const newRecRef = attendanceRef.push();
    await newRecRef.set({
      userId: userId,
      date: formatedDate,
      time: `${hours}:${minutes}`,
      classId: classId,
    });

    // Return success response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: "Record added successfully",
        debugTime: egyptTime 
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