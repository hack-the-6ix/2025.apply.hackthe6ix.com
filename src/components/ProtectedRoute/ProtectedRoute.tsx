import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../auth/middleware";
import { useAuth } from "../../contexts/AuthContext";
import type { Profile } from "../../auth/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { setProfile } = useAuth();

  useEffect(() => {
    const authenticate = async () => {
      const profile: Profile | null = await checkAuth();
      setProfile(profile);
      setIsAuthenticated(!!profile);
    };
    authenticate();
  }, [location.pathname, setProfile]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
