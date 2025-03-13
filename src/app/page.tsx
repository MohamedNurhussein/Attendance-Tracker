'use client'

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter()
  return (
    <>
      <h1>Welcome to my Attendance System</h1>
      <Button onClick={()=>router.push("/login")}>Get Started</Button>
    </>
  );
}
