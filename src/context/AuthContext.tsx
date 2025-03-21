// src/context/AuthContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import auth from "@/lib/firebase"; // Your Firebase config
import { useRouter } from "next/navigation";

type AuthContextType = {
  user: FirebaseUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const addData = (id, name: string, email: string) => {
    return fetch("/.netlify/functions/addData", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        name,
        email,
      }),
    }).catch((err) => console.error("error while trying to add data: ",err));
  };
  
  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    // Clean up subscription
    return () => unsubscribe();
  }, []);

  // Login with Firebase
  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(() => router.push("/dashboard"))
      .catch(error => {
        console.error("Login error:", error);
        throw error;
      });
  };

  // Signup with Firebase
  const signup = (name: string, email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Add name
        return updateProfile(userCredential.user, {
          displayName: name
        }).then(() => userCredential);
      })
      .then(userCredential => {
        // Add data to server side
        return addData(userCredential.user.uid, name, email)
          .then(() => userCredential);
      })
      .then(() => {
        router.push("/dashboard");
      })
      .catch(error => {
        console.error("Signup error:", error);
        throw error;
      });
  };

  // Logout with Firebase
  const logout = () => {
    return signOut(auth)
      .then(() => {
        router.push("/login");
      })
      .catch(error => {
        console.error("Logout error:", error);
        throw error;
      });
  };

  return (
    <AuthContext.Provider value={{ user, userLoggedIn: !!user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}