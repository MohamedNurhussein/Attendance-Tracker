import { useEffect, useState } from "react";
import { Records, columns } from "./admin-columns";
import { DataTable } from "./admin-data-table";

export default function DemoPage() {
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
  }, []);

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
