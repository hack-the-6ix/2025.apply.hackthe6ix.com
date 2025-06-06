import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchHt6 } from "../api/client";
import type { AuthResponse, CallbackPayload } from "../auth/types";

export default function Callback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const state = searchParams.get("state");
    const code = searchParams.get("code");

    if (!state || !code) {
      navigate("/");
      return;
    }

    async function setSession() {
      try {
        console.log("state", state);
        console.log("code", code);
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
          console.log("response", response);
          localStorage.setItem("token", response.message.token);
          localStorage.setItem("refreshToken", response.message.refreshToken);
          console.log(response.message.redirectTo);
          navigate(response.message.redirectTo || "/");
        }
      } catch (error) {
        console.error("Authentication failed:", error);
        navigate("/");
      }
    }

    setSession();
  }, [searchParams, navigate]);

  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Logging in...</p>
    </div>
  );
}
