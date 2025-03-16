import { Records, columns } from "./admin-columns";
import { DataTable } from "./admin-data-table";

async function getData(): Promise<Records[]> {
  // Fetch data from your API here.
  return [
    {
      recordId: "728ed52f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2022-01-01",
      time: "09:00",
      classId: "class A",
    },
    {
      recordId: "758eu52f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2023-01-01",
      time: "06:00",
      classId: "class B",
    },
    {
      recordId: "908ef52f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class C",
    },
    {
      recordId: "9081f52f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class D",
    },
    {
      recordId: "908efA2f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class E",
    },
    {
      recordId: "908e1232f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class F",
    },
    {
      recordId: "908ef52H",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class G",
    },
    {
      recordId: "908ef52i",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class H",
    },
    {
      recordId: "908ef51i",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class I",
    },
    {
      recordId: "908ef52j",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class j",
    },
    {
      recordId: "908eB52f",
      username: "abc",
      email: "abc@gmail.com",
      date: "2025-01-01",
      time: "13:00",
      classId: "class K",
    },
    {
      recordId: "908ef52L",
      username: "abc",
      email: "abc@gmail.com",
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
