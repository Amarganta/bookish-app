import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { RootState } from "@lib/store";
import { AuthUser } from "@/types/types";

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
  const isManualAuth = isHydrated && isReduxAuthenticated && !!authUser;

  // ✅ FALLBACK: Verificar localStorage manual si Redux no tiene usuario
  const hasFallbackUser =
    isHydrated &&
    !authUser &&
    typeof window !== "undefined" &&
    localStorage.getItem("mockUsers");
  const isAuthenticated = isGoogleAuth || isManualAuth || hasFallbackUser;

  const currentUser = useMemo(() => {
    if (isGoogleAuth && session?.user) {
      return {
        id: session.user.email || "google-user",
        name: session.user.name || "Usuario Google",
        email: session.user.email || "",
        avatar: session.user.image || "",
        createdAt: new Date().toISOString(),
      };
    }

    if (isManualAuth && authUser) {
      return authUser;
    }

    //  Si Redux no tiene usuario, verificar localStorage manual
    if (
      isHydrated &&
      !authUser &&
      !isGoogleAuth &&
      typeof window !== "undefined"
    ) {
      try {
        const fallbackUsers = localStorage.getItem("mockUsers");
        if (fallbackUsers) {
          const parsedUsers = JSON.parse(fallbackUsers);
          // Retornar el ultimo usuario registrado (mas reciente)
          if (parsedUsers.length > 0) {
            return parsedUsers[parsedUsers.length - 1];
          }
        }
      } catch (error) {
        console.error("Error parsing localStorage users:", error);
      }
    }

    return null;
  }, [isGoogleAuth, isManualAuth, session?.user, authUser, isHydrated]);

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
