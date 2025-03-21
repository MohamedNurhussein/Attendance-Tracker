// src/components/RouteGuard.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  
  useEffect(() => {
    if (!loading) {
      // If no user and not on auth pages, redirect to login
      if (!user && !pathname.includes("/login") && !pathname.includes("/signup")) {
        router.push("/login");
      }
      
      // If user is logged in and on auth pages, redirect to dashboard
      if (user) {
        router.push("/dashboard");
      }
    }
  }, [user, loading, pathname, router]);

  // Show loading spinner while checking auth state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-gray-900"></div>
      </div>
    );
  }

  return <>{children}</>;
}