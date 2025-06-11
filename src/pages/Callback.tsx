import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchHt6 } from "../api/client";
import type { AuthResponse, CallbackPayload } from "../auth/types";
import { checkAuth } from "../auth/middleware";
import { useAuth } from "../contexts/AuthContext";
import { useApplicationContext } from "../contexts/ApplicationContext";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setProfile } = useAuth();
  const { setFormData, formData } = useApplicationContext();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) {
      navigate("/");
      return;
    }

    async function setSession() {
      try {
        const response = await fetchHt6<AuthResponse, CallbackPayload>(
          "/auth/apply-backend/callback",
          {
            method: "POST",
            body: { state: state || "", code: code || "" }
          }
        );

        if (
          response.status === 200 &&
          response.message.token &&
          response.message.refreshToken
        ) {
          localStorage.setItem("token", response.message.token);
          localStorage.setItem("refreshToken", response.message.refreshToken);

          const profile = await checkAuth();
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
            navigate("/applied");
          } else {
            navigate(response.message.redirectTo || "/");
          }
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setProfile(null);
        navigate("/");
      }
    }

    setSession();
  }, [searchParams, navigate, setProfile, setFormData, formData]);

  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Logging in...</p>
    </div>
  );
}
