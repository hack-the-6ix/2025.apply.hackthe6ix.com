import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../auth/middleware";
import { useAuth } from "../../contexts/AuthContext";
import { useApplicationContext } from "../../contexts/ApplicationContext";
import type { Profile } from "../../auth/types";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { setProfile } = useAuth();
  const { setFormData, formData } = useApplicationContext();

  useEffect(() => {
    const authenticate = async () => {
      const profile: Profile | null = await checkAuth();
      setProfile(profile);
      if (profile?.firstName && profile?.email && profile?.lastName) {
        setFormData({
          ...formData,
          fullName: profile.firstName,
          email: profile.email,
          lastName: profile.lastName
        });
      }

      if (profile?.status?.applied) {
        setIsAuthenticated(false);
        window.location.href = "/applied";
      } else {
        setIsAuthenticated(!!profile);
      }
    };
    authenticate();
  }, [location.pathname, setProfile, setFormData, formData]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
