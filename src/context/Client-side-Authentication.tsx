//Client-side Authentication Provider Wrapper
"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ReactNode } from "react";

export default function ClientAuthProvider({ children }: { children: ReactNode }) {
  return <AuthProvider>{children}</AuthProvider>;
}