import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../auth/middleware";
import { useAuth } from "../../contexts/AuthContext";
import { useApplicationContext } from "../../contexts/ApplicationContext";
import type { Profile } from "../../auth/types";
import type { FormData } from "../../contexts/ApplicationContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { setProfile } = useAuth();
  const { formData, setFormData } = useApplicationContext();

  useEffect(() => {
    const authenticate = async () => {
      const profile: Profile | null = await checkAuth();
      setProfile(profile);
      if (profile?.firstName && profile?.email && profile?.lastName) {
        const newFormData: FormData = {
          ...formData,
          firstName: formData.firstName || profile.firstName,
          lastName: formData.lastName || profile.lastName,
          email: formData.email || profile.email
        };
        setFormData(newFormData);
        setProfile({ ...profile, ...newFormData });
      }

      if (profile?.status?.applied) {
        setIsAuthenticated(false);
        window.location.href = "/applied";
      } else {
        setIsAuthenticated(!!profile);
      }
    };
    authenticate();
  }, [location.pathname, setProfile, setFormData]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
