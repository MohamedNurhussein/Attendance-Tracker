import { useEffect, useState } from "react";
import { Records, columns } from "./admin-columns";
import { DataTable } from "./admin-data-table";

export default function DemoPage({refreshTrigger}) {
  const [data, setData] = useState<Records[]>([]);
  const [loading, setLoading] = useState(true);

  function getAllRecords() {
    // Fetch all records from server side
    fetch("/.netlify/functions/getAllAttendanceRecords", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((body) => {
        //set records
        setData(body.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getAllRecords();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
