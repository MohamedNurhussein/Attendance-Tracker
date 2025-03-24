import { useEffect, useState } from "react";
import { Records, columns } from "./student-columns";
import { DataTable } from "./student-data-table";

export default function DemoPage({ userId, refreshTrigger }) {
  // const data = await getAttendanceData();
  const [data, setData] = useState<Records[]>([]);
  const [loading, setLoading] = useState(true);

  function getAttendanceData() {
    // Fetch attendace data
    fetch("/.netlify/functions/getStudentAttendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: userId }),
    })
      .then((response) => response.json())
      .then((body) => {
        console.log("on client: ", body);
        //get attendance data
        setData(body.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    getAttendanceData();
  }, [refreshTrigger]); //[]

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
      </div>
    );
  }
  return (
<div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">My Attendance History</h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>  );
}
