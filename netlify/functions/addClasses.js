import db from "../../src/lib/firebase-admin";
export const handler = async () => {
  try {
    //get refrence to classes node
    const ref = db.ref("classes");

    ref.set({
      course1: { name: "Computer Science", value: "Computer Science" },
      course2: { name: "Software Engineering", value: "Software Engineering" },
      course3: { name: "Data Science", value: "Data Science" },
      course4: {
        name: "Artificial Intelligence",
        value: "Artificial Intelligence",
      },
      course5: { name: "Cybersecurity", value: "Cybersecurity" },
      course6: { name: "Cloud Computing", value: "Cloud Computing" },
      course7: { name: "Web Development", value: "Web Development" },
      course8: {
        name: "Mobile App Development",
        value: "Mobile App Development",
      },
      course9: { name: "Game Development", value: "Game Development" },
      course10: { name: "Machine Learning", value: "Machine Learning" },
      course11: {
        name: "Blockchain Technology",
        value: "Blockchain Technology",
      },
      course12: { name: "Internet of Things", value: "Internet of Things" },
      course13: { name: "Embedded Systems", value: "Embedded Systems" },
      course14: { name: "Database Management", value: "Database Management" },
      course15: { name: "Network Security", value: "Network Security" },
      course16: { name: "Big Data Analytics", value: "Big Data Analytics" },
      course17: { name: "DevOps Engineering", value: "DevOps Engineering" },
      course18: { name: "Robotics", value: "Robotics" },
      course20: { name: "Quantum Computing", value: "Quantum Computing" },
    });
    //return a response
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify("Classes added successfully"),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(`Error adding classes: ${err}`),
    };
  }
};
// {
//   "course1": { "name": "Computer Science", "value": "Computer Science" },
//   "course2": { "name": "Software Engineering", "value": "Software Engineering" },
//   "course3": { "name": "Data Science", "value": "Data Science" },
//   "course4": { "name": "Artificial Intelligence", "value": "Artificial Intelligence" },
//   "course5": { "name": "Cybersecurity", "value": "Cybersecurity" },
//   "course6": { "name": "Cloud Computing", "value": "Cloud Computing" },
//   "course7": { "name": "Web Development", "value": "Web Development" },
//   "course8": { "name": "Mobile App Development", "value": "Mobile App Development" },
//   "course9": { "name": "Game Development", "value": "Game Development" },
//   "course10": { "name": "Machine Learning", "value": "Machine Learning" },
//   "course11": { "name": "Blockchain Technology", "value": "Blockchain Technology" },
//   "course12": { "name": "Internet of Things", "value": "Internet of Things" },
//   "course13": { "name": "Embedded Systems", "value": "Embedded Systems" },
//   "course14": { "name": "Database Management", "value": "Database Management" },
//   "course15": { "name": "Network Security", "value": "Network Security" },
//   "course16": { "name": "Big Data Analytics", "value": "Big Data Analytics" },
//   "course17": { "name": "DevOps Engineering", "value": "DevOps Engineering" },
//   "course18": { "name": "Robotics", "value": "Robotics" },
//   "course20": { "name": "Quantum Computing", "value": "Quantum Computing" }
// }
