"use client"
import NavBar from "@/components/navBar";
import RouteGuard from "@/components/RouteGuard";
import { useAuth } from "@/context/AuthContext";
// import { useEffect } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useAuth();

  // Add logging to help diagnose the issue
  // useEffect(() => {
  //   console.log('AuthenticatedLayout mounted');
  //   console.log('Current user:', auth.user);
  //   return () => {
  //     console.log('AuthenticatedLayout unmounted');
  //   };
  // }, [auth]);

  return (
    <RouteGuard>
      <NavBar 
        onLogout={() => {
          console.log('Logout attempted');
          return auth.logout();
        }} 
      />
      <div className="pt-13">
        {children}
      </div>
    </RouteGuard>
  );
}