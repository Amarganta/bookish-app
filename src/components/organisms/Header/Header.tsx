"use client";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "@features/authSlice";
import { useRouter } from "next/navigation";
import { RootState } from "@lib/store";
import { Button } from "@atoms/Button/Button";

export const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    // localStorage.removeItem("mockUser"); // limpia el user simulado
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
      <h1 className="text-xl font-semibold text-primary">📚 Bookish</h1>

      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="text-gray-700 text-sm font-medium">
              {user.name}
            </span>
            <img
              src={
                user.avatar ||
                "https://api.dicebear.com/8.x/thumbs/svg?seed=bookish"
              }
              alt="avatar"
              className="w-8 h-8 rounded-full border border-gray-300"
            />
          </>
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
