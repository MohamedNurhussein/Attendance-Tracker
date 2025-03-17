"use client";
import Image from "next/image";
import { Button } from "./ui/button";
// import { useAuth } from "@/context/AuthContext";
export default function NavBar({
  onLogout,
}: {
  onLogout: () => Promise<void>;
}) {
  // const { user } = useAuth();
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.svg"
              alt="Attendance System Logo"
              width={40}
              height={40}
              className="w-8 h-8"
            />
            <h1 className="font-semibold text-lg text-gray-900">
              Attendance Tracker
            </h1>
          </div>

          {/* Navigation Links and Button */}
          <div className="flex items-center space-x-6">
            <Button onClick={onLogout} variant="destructive" size="sm">
              Logout
            </Button>{" "}
          </div>
        </div>
      </div>
    </header>
  );
}
