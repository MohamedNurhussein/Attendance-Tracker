"use client";

// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import logo from "../../public/logo.svg";
// import Image from "next/image";
import {LoginForm} from "@/components/login-form";
export default function Home() {
  // const router = useRouter();
  return (
    <>
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <LoginForm />
        </div>
      </div>
      {/* <Button
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
      <Button onClick={() => router.push("/login")}>Get Started</Button> */}
    </>
  );
}
