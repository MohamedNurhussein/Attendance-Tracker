import db from "../../src/lib/firebase-admin";
export const handler = async (event) => {
  //post
  try {
    if(!event.body){
        return{
            statusCode:400,
            body:JSON.stringify("body is required")
        }
    }
    //get userId, date, time, classId from body
    const { userId, classId } = JSON.parse(event.body);
    console.log("userId: " + userId)
    console.log("classId: " + classId)
    //get timestamp
    const now = new Date();
    const formatedDate = now.toLocaleDateString();
    const formatedTime = now.toLocaleTimeString();
    const [hour, minute] = formatedTime.split(":");
    console.log("hour + : + minute: ", hour + ":" + minute);

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
      body: JSON.stringify({
        message: "Record added successfully",
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error marking an attendance: ${err}`),
    };
  }
};
