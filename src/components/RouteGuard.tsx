"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function RouteGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    console.log('RouteGuard useEffect', { 
      user: !!user, 
      loading, 
      pathname,
      localLoading 
    });

    // Synchronize local loading state
    if (!loading) {
      setLocalLoading(false);
    }
  }, [user, loading, pathname]);

  useEffect(() => {
    if (!localLoading) {
      const isAuthPage = pathname.includes("/login") || pathname.includes("/signup");
      
      console.log('Redirect checks', {
        user: !!user,
        isAuthPage,
        pathname
      });

      // Redirect logic
      if (!user && !isAuthPage) {
        console.log('Redirecting to login');
        router.replace("/login");
        return;
      }

      if (user && isAuthPage) {
        console.log('Redirecting to dashboard');
        router.replace("/dashboard");
        return;
      }
    }
  }, [user, localLoading, pathname, router]);

  // Prevent rendering during loading
  if (loading || localLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-blue-500 border-blue-200"></div>
      </div>
    );
  }

  return children;
}