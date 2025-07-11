import { fetchHt6 } from "../api/client";
import type { AuthResponse, LoginPayload, Profile } from "./types";

export async function checkAuth(): Promise<Profile | null> {
  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshToken");

  if (token && refreshToken) {
    try {
      const response = await fetchHt6<{ status: number; message: Profile }>(
        "/api/action/profile",
      );
      if (response.status === 200) {
        return response.message;
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
        redirectTo: "/apply/player",
      },
    },
  );

  if (response.status === 200 && response.message.url) {
    window.location.href = response.message.url;
  }

  return null;
}

export interface ApplicationEnums {
  school: string[];
  programOfStudy: string[];
  gender: string[];
  pronouns: string[];
  ethnicity: string[];
  shirt: string[];
  province: string[];
  countries: string[];
  levelOfStudy: string[];
  hackathonsAttended: string[];
  requestedWorkshops: string[];
  emergencyContactRelationship: string[];
  dietaryRestrictions: string[];
  howDidYouHearAboutHT6: string[];
  previousHT6Experience: string[];
}

export async function checkEnums(): Promise<ApplicationEnums | null> {
  try {
    const response = await fetchHt6<{
      status: number;
      message: ApplicationEnums;
    }>("/api/action/applicationEnums");
    if (response.status === 200) {
      return response.message;
    }
  } catch (error) {
    console.error(error);
  }

  return null;
}
