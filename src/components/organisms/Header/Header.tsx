"use client";

import { useDispatch, useSelector } from "react-redux";
import { useSession, signOut } from "next-auth/react";
import { logout } from "@features/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@lib/store";
import { Button } from "@atoms/Button/Button";

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data: session } = useSession();
  const authUser = useSelector((state: RootState) => state.auth.user);
  const isReduxAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  // 🔹 Determinar origen del login
  const isGoogleAuth = !!session?.user;
  const isManualAuth = isReduxAuthenticated && !isGoogleAuth;

  // 🔹 Obtener datos del usuario actual (de Redux o de NextAuth)
  const currentUser = isGoogleAuth
    ? {
        name: session?.user?.name ?? "Usuario Google",
        email: session?.user?.email ?? "",
        avatar: session?.user?.image ?? "",
      }
    : authUser;

  const handleLogout = async () => {
    if (isGoogleAuth) {
      await signOut({ callbackUrl: "/login" });
    } else {
      dispatch(logout());
      router.push("/login");
    }
  };

  if (!currentUser) return null;

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <h1 className="text-xl font-semibold text-primary">📚 Bookish</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-700 text-sm font-medium">
          {currentUser.name}
        </span>
        {currentUser.avatar && (
          <img
            src={currentUser.avatar}
            alt="avatar"
            className="w-8 h-8 rounded-full border border-gray-300"
          />
        )}
        <Button
          variant="secondary"
          onClick={handleLogout}
          className="text-sm px-3 py-1"
        >
          Cerrar sesión
        </Button>
      </div>
    </header>
  );
};
