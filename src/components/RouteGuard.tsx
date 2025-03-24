// src/components/RouteGuard.tsx
"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading) {
      // If no user and not on auth pages, redirect to login
      if (
        !user &&
        !pathname.includes("/login") &&
        !pathname.includes("/signup")
      ) {
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
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
      </div>
    );
  }

  return <>{children}</>;
}
