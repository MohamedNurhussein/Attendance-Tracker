import { Records, columns } from "./user-columns";
import { DataTable } from "./user-data-table";

async function getData(): Promise<Records[]> {
  // Fetch data from your API here.
  return [
    {
      recordId: "728ed52f",
      date: "2022-01-01",
      time: "09:00",
      classId: "class A",
    },
    {
      recordId: "758eu52f",
      date: "2023-01-01",
      time: "06:00",
      classId: "class B",
    },
    {
      recordId: "908ef52f",
      date: "2025-01-01",
      time: "13:00",
      classId: "class C",
    },
    {
      recordId: "9081f52f",
      date: "2025-01-01",
      time: "13:00",
      classId: "class D",
    },
    {
      recordId: "908efA2f",
      date: "2025-01-01",
      time: "13:00",
      classId: "class E",
    },
    {
      recordId: "908e1232f",
      date: "2025-01-01",
      time: "13:00",
      classId: "class F",
    },
    {
      recordId: "908ef52H",
      date: "2025-01-01",
      time: "13:00",
      classId: "class G",
    },
    {
      recordId: "908ef52i",
      date: "2025-01-01",
      time: "13:00",
      classId: "class H",
    },
    {
      recordId: "908ef51i",
      date: "2025-01-01",
      time: "13:00",
      classId: "class I",
    },
    {
      recordId: "908ef52j",
      date: "2025-01-01",
      time: "13:00",
      classId: "class j",
    },
    {
      recordId: "908eB52f",
      date: "2025-01-01",
      time: "13:00",
      classId: "class K",
    },
    {
      recordId: "908ef52L",
      date: "2025-01-01",
      time: "13:00",
      classId: "class L",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
