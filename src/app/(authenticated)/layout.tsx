// app/(authenticated)/layout.tsx
"use client";

import NavBar from "@/components/navBar";
import RouteGuard from "@/components/RouteGuard";
import { useAuth } from "@/context/AuthContext";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();

  return (
    <RouteGuard>
      <NavBar onLogout={logout} />
      <div className="pt-16">
        {children}
      </div>
    </RouteGuard>
  );
}