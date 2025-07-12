"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/router"; // ✅ Correct for Pages Router
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login"); // ✅ Redirect to login if user not authenticated
    }
  }, [user, isLoading, router]);

  if (isLoading || (!user && typeof window !== "undefined")) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
