"use client";

import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logout } from "@features/authSlice";
import { Button } from "@/components/atoms/Button/Button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "../atoms/Avatar/Avatar";

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, isGoogleAuth, currentUser } = useAuth();

  const handleLogout = async () => {
    if (isGoogleAuth) {
      // Opción 1: Logout completo (desconecta de Google también)
      await signOut({
        callbackUrl: "/login",
        redirect: true,
      });
    } else {
      dispatch(logout());
      router.push("/login");
    }
  };

  if (!isAuthenticated || !currentUser) return null;

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <h1 className="text-xl font-semibold text-primary">📚 Bookish</h1>

      <div className="flex items-center gap-3">
        <span className="text-gray-700 text-sm font-medium">
          {currentUser.name}
        </span>
        {currentUser.avatar && (
          <Avatar
            src={currentUser.avatar || ""}
            alt={currentUser.name || "Usuario"}
            size="sm"
            border={true}
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
