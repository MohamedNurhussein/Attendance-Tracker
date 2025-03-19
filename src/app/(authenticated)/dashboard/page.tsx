import { ComboboxForm } from "@/components/combobox-form";
import AdminTable from "../../records/admin-table";
import UserTable from "../../records/student-table";
import { Button } from "@/components/ui/button";
export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-3 md:p-10">
      <div className="w-full max-w-sm">
        <ComboboxForm />
        <UserTable />
      </div>
      <div>
        {/* <Button>Attendance History</Button> */}
        {/* <AdminTable /> */}
      </div>
    </div>
  );
}
