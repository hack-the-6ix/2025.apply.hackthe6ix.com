import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchHt6 } from "../api/client";
import type { AuthResponse, CallbackPayload } from "../auth/types";
import { checkAuth, checkEnums } from "../auth/middleware";
import { useAuth } from "../contexts/AuthContext";
import { useApplicationContext } from "../contexts/ApplicationContext";
import type { FormData } from "../contexts/ApplicationContext";
import { useEnums } from "../contexts/EnumsContext";
import Loading from "../components/Loading/Loading";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setProfile } = useAuth();
  const { setEnums } = useEnums();
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
            const newFormData: FormData = {
              ...formData,
              firstName: formData.firstName || profile.firstName,
              lastName: formData.lastName || profile.lastName,
              email: formData.email || profile.email
            };
            setFormData(newFormData);

            if (profile.status?.applied) {
              navigate("/submitted");
            } else {
              const enums = await checkEnums();
              setEnums(enums);
              navigate(response.message.redirectTo || "/");
            }
          }
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        setProfile(null);
        navigate("/");
      }
    }

    setSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, navigate, setProfile, setFormData, setEnums]);

  return <Loading />;
}
