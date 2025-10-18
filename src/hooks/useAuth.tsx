import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "@lib/store";

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

  const currentUser = isGoogleAuth
    ? {
        name: session?.user?.name || "Usuario Google",
        email: session?.user?.email || "",
        avatar: session?.user?.image || "",
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
