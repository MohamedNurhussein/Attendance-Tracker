"use client";
import { ComboboxForm } from "@/components/combobox-form";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminTable from "../../records/admin-table";
import UserTable from "../../records/student-table";
import { Button } from "@/components/ui/button";

export default function Page() {
  const { user } = useAuth();
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const checkRole = () => {
    setLoading(true);
    fetch("/.netlify/functions/getRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid }),
    })
      .then(response => response.json())
      .then(body => {
        const role = body.data;
        if (role === "student") setIsStudent(true);
        else setIsStudent(false);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  
  useEffect(() => {
    checkRole();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }
  
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-3 md:p-10">
      {isStudent ? (
        <div className="w-full max-w-sm">
          <ComboboxForm />
          <UserTable />
        </div>
      ) : (
        <div>
          <div>
            <Button>Attendance History</Button>
            <AdminTable />
            hello admin
          </div>
        </div>
      )}
    </div>
  );
}