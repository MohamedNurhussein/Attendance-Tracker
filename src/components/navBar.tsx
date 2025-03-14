"use client";
import Link from "next/link";
import Image from "next/image";
import auth  from "@/firebase/auth";
import { signOut } from "firebase/auth";
export default function NavBar() {
  // const router = useRouter();
  const onLogout = async () => {
    console.log("loging out")
    // try {
    //   await signOut(auth);
    // } catch (err) {
    //   console.error("Error occured whiel loging out: ", err);
    // }
    //redirect to login page
  };
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
            {/* <Link
              href="/dashboard"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Dashboard
            </Link> */}
            <Link href="/"
              onClick={onLogout}
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
