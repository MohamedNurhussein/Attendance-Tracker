"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <Button
        onClick={() => {
          toast("attendace has been recorder", {
            description: "Class A",
          });
          console.log("hohoo");
        }}
      >
        Record attendance
      </Button>
      <h1>Welcome to my Attendance System</h1>
      <Button onClick={() => router.push("/login")}>Get Started</Button>
    </>
  );
}
