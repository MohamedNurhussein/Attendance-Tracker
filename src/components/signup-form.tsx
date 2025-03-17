"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { signup } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSignup = async (e) => {
    e.preventDefault();
    //clear error message
    setError("");
    //start loading
    setIsLoading(true);
    try {
      await signup(name, email, password);
      console.log("account been created successfully");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setError("Invalid email or password. Please try again.");
          break;

        case "auth/email-already-in-use":
          setError(
            "An account with this email already exists. Please sign in or use a different email."
          );
          break;

        case "auth/weak-password":
          setError(
            "Please choose a stronger password (at least 6 characters)."
          );
          break;

        case "auth/network-request-failed":
          setError(
            "Network error. Please check your connection and try again."
          );
          break;

        default:
          // Log the actual error for debugging
          console.error("Auth error:", err.code, err.message);
          setError("An error occurred. Please try again later.");
          break;
      }
    } finally {
      //stop loading
      setIsLoading(false);
    }
  };
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
          <CardDescription>
            Enter your details below to create a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup}>
            <div className="flex flex-col gap-6">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
                required
              />
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-3">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "loading..." : "Sign up"}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
