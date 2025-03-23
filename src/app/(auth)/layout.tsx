// app/(auth)/layout.tsx
import RouteGuard from "@/components/RouteGuard";
import Image from "next/image";
import { Calendar } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left side - Branded section with background */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-800 text-white flex-col justify-center items-center p-8">
          <div className="max-w-md text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-white p-4">
                <Calendar className="w-12 h-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-6">Attendance Tracker</h1>
            <p className="text-xl mb-8">
              Streamline your attendance management with our cloud-based tracking system
            </p>
            <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
              <p className="text-lg font-medium mb-2">Features</p>
              <ul className="text-left space-y-2">
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                  <span>Instant attendance recording</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                  <span>Comprehensive history tracking</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                  <span>Admin management dashboard</span>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-white mr-2"></div>
                  <span>Responsive mobile design</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50 p-6 md:p-10">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </RouteGuard>
  );
}