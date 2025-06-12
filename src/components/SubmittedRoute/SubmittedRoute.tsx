import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { checkAuth } from "../../auth/middleware";
import { useAuth } from "../../contexts/AuthContext";
import type { Profile } from "../../auth/types";
import Loading from "../Loading/Loading";

interface SubmittedRouteProps {
  children: React.ReactNode;
}

export function SubmittedRoute({ children }: SubmittedRouteProps) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const location = useLocation();
  const { setProfile } = useAuth();

  useEffect(() => {
    const checkAuthorization = async () => {
      const profile: Profile | null = await checkAuth();
      setProfile(profile);

      if (profile?.status?.applied) {
        setIsAuthorized(true);
      } else {
        setIsAuthorized(false);
      }
    };
    checkAuthorization();
  }, [location.pathname, setProfile]);

  if (isAuthorized === null) {
    return <Loading />;
  }

  return isAuthorized ? <>{children}</> : <Navigate to="/" />;
}
