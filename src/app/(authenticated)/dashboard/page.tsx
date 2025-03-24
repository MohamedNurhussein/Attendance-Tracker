"use client";
import { ComboboxForm } from "@/components/combobox-form";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import AdminTable from "../../records/admin-table";
import StudentTable from "../../records/student-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon, ListIcon } from "lucide-react";

export default function Page() {
  const { user } = useAuth();
  const [isStudent, setIsStudent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableRefreshTrigger, setTableRefreshTrigger] = useState(0);
  const [activeTab, setActiveTab] = useState("record");

  const handleAttendanceRecorded = () => {
    setTableRefreshTrigger((prev) => prev + 1);
    // Automatically switch to history tab after recording attendance
    setActiveTab("history");
  };

  const checkRole = useCallback(() => {
    setLoading(true);
    fetch("/.netlify/functions/getRole", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: user.uid }),
    })
      .then((response) => response.json())
      .then((body) => {
        const role = body.data;
        setIsStudent(role === "student"); //true if student; false if not
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    checkRole();
  }, [user, checkRole]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-50 pt-9 pb-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            {isStudent ? "Student Dashboard" : "Admin Dashboard"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isStudent
              ? "Record your attendance and view your history"
              : "Monitor and manage all attendance records"}
          </p>
        </div>

        {user && isStudent ? (
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
              <TabsTrigger
                value="record"
                className="flex items-center pr-2 gap-2"
              >
                <CalendarIcon className="h-4 w-4" />
                <span>Record Attendance</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <ListIcon className="h-4 w-4" />
                <span>History</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="record">
              <Card className="max-w-md py-4 mx-auto shadow-lg">
                <CardContent className="pt-2">
                  <ComboboxForm
                    onAttendanceRecorded={handleAttendanceRecorded}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card className="shadow-lg">
                <CardContent className="p-3">
                  <StudentTable
                    userId={user.uid}
                    refreshTrigger={tableRefreshTrigger}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-2">
              <AdminTable refreshTrigger={tableRefreshTrigger} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
