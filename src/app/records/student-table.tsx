import { useEffect, useState } from "react";
import { Records, columns } from "./student-columns";
import { DataTable } from "./student-data-table";

export default function DemoPage({ userId }) {
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
  },[]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
