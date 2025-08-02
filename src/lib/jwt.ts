import { jwtDecode } from "jwt-decode";

export function decodeJwt<T>(token: string): T | null {
  try {
    return jwtDecode<T>(token);
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    throw new Error("Invalid JWT token");
  }
}