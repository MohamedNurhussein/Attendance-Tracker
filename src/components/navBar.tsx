"use client";
import { useState, useEffect } from "react";
// import Image from "next/image";
import { Button } from "./ui/button";
import { UserCircle, Menu, X, Calendar } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function NavBar({
  onLogout,
}: {
  onLogout: () => Promise<void>;
}) {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (user?.displayName) {
      setUserName(user.displayName);
      setIsLoading(false);
    } else if (user?.email) {
      // Extract name from email if display name not available
      const emailName = user.email.split("@")[0];
      setUserName(emailName.charAt(0).toUpperCase() + emailName.slice(1));
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [user]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 p-2">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-bold text-lg text-gray-900 hidden sm:block">
              Attendance Tracker
            </h1>
            <h1 className="font-bold text-lg text-gray-900 sm:hidden">
              A-Track
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && (
              <div className="flex items-center space-x-2 text-gray-700">
                <UserCircle className="w-5 h-5" />
                <span className="font-medium">{userName}</span>
              </div>
            )}
            <Button
              onClick={onLogout}
              variant="destructive"
              size="sm"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              Logout
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t py-4 px-2 space-y-3">
            {!isLoading && (
              <div className="flex items-center space-x-2 text-gray-700 p-2">
                <UserCircle className="w-5 h-5" />
                <span className="font-medium">{userName}</span>
              </div>
            )}
            <div>
              <Button
                onClick={onLogout}
                variant="destructive"
                size="sm"
                className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
              >
                Logout
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
