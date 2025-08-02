import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch } from "@/store/hooks";
import { setUser } from "@/store/slices/authSlice";
import { decodeJwt } from "@/lib/jwt";
import type { User } from "@/types";
import { toast } from "react-toastify";

const AuthInitializer = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    let decodedUser: User | null = null;
    let token: string | null = sessionStorage.getItem("token");

    try {
      if (token) {
        decodedUser = decodeJwt<User>(token);
      } else {
        token = searchParams.get("token");
        if (token) {
          decodedUser = decodeJwt<User>(token);
          console.log("Decoded User:", decodedUser);
          sessionStorage.setItem("token", token);
        }
      }
    } catch {
      toast.error("Invalid token. Please log in again.");
    }

    // console.log("Decoded User:", decodedUser);

    // Always dispatch setUser to resolve the auth state, even if null
    dispatch(setUser(decodedUser));
  }, [searchParams, dispatch]);

  return null; // This component doesn't render anything
};

export default AuthInitializer;
