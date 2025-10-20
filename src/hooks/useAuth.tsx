import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@lib/store";
import { AuthUser, GoogleUser } from "@/types/types";

export const useAuth = () => {
  const { data: session, status } = useSession();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const isReduxAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const isGoogleAuth = isHydrated && !!session?.user;
  const isManualAuth = isHydrated && isReduxAuthenticated && !isGoogleAuth;
  const isAuthenticated = isGoogleAuth || isManualAuth;

  // Crear usuario consistente para Google Auth
  const currentUser: AuthUser | null = isGoogleAuth
    ? {
        id: session?.user?.email || Date.now().toString(),
        name: session?.user?.name || "Usuario Google",
        email: session?.user?.email || "",
        avatar: session?.user?.image || "",
        createdAt: new Date().toISOString(),
      }
    : authUser;

  return {
    isAuthenticated,
    isGoogleAuth,
    isManualAuth,
    currentUser,
    session,
    loading: status === "loading" || !isHydrated,
    isHydrated,
  };
};
