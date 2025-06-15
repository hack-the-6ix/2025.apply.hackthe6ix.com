import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth, checkEnums } from "../../auth/middleware";
import { useAuth } from "../../contexts/AuthContext";
import { useApplicationContext } from "../../contexts/ApplicationContext";
import type { Profile } from "../../auth/types";
import type { FormData } from "../../contexts/ApplicationContext";
import { useEnums } from "../../contexts/EnumsContext";
import Loading from "../Loading/Loading";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const location = useLocation();
  const { setProfile } = useAuth();
  const { setEnums } = useEnums();
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

        if (profile.status?.applied) {
          setIsAuthenticated(false);
          window.location.href = "/submitted";
        } else {
          const enums = await checkEnums();
          setEnums(enums);
          setIsAuthenticated(!!profile);
        }
      } else {
        setIsAuthenticated(false);
      }
    };
    authenticate();
  }, [location.pathname, setProfile, setFormData, setEnums]);

  if (isAuthenticated === null) {
    return <Loading />;
  }

  return isAuthenticated ? <>{children}</> : <Navigate to="/" />;
}
