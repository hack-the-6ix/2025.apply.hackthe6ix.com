import { fetchHt6 } from "../api/client";
import type { AuthResponse, LoginPayload, Profile } from "./types";

export async function checkAuth(): Promise<boolean> {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (token && refreshToken) {
    try {
      const response = await fetchHt6<{ status: number; message: Profile }>(
        "/api/action/profile"
      );
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      console.error(error);
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
    }
  }

  const callbackURL = `${window.location.origin}/callback`;
  const response = await fetchHt6<AuthResponse, LoginPayload>(
    "/auth/apply-backend/login",
    {
      method: "POST",
      body: {
        callbackURL,
        redirectTo: window.location.href
      }
    }
  );

  if (response.status === 200 && response.message.url) {
    window.location.href = response.message.url;
  }

  return false;
}
