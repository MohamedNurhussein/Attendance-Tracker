"use client"
import { SignupForm } from "@/components/signup-form";
import { Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
export default function Page() {
  const {userLoggedIn} = useAuth();
    //check if user is logged in
    if(userLoggedIn){
      return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
        </div>
      );
    }
  return (
    <div className="w-full space-y-6">
      {/* Mobile logo - only visible on mobile */}
      <div className="md:hidden flex flex-col items-center mb-8">
        <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-4 mb-4">
          <Calendar className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Attendance Tracker</h1>
      </div>

      <div className="bg-white shadow-xl rounded-xl p-8 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Create an Account</h2>
          <p className="text-gray-600 mt-2">Join our attendance tracking system</p>
        </div>
        <SignupForm />
      </div>

      <div className="text-center text-xs text-gray-500 mt-8">
        <p>© {new Date().getFullYear()} Attendance Tracker. All rights reserved.</p>
      </div>
    </div>
  );
}