"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { logout } from "@/lib/features/authSlice";
import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { Avatar } from "@/components/atoms/Avatar";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, isGoogleAuth, currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      if (isGoogleAuth) {
        // Para Google Auth: NextAuth maneja la limpieza automáticamente
        await signOut({ 
          callbackUrl: "/login",
          redirect: true 
        });
      } else {
        // Para autenticación manual: limpiar solo la sesión actual
        
        // 1. Limpiar Redux store
        dispatch(logout());
        
        // 2. NO limpiar los datos de usuarios (persist:root, mockUser)
        // Solo limpiar datos de sesión específicos
        localStorage.removeItem('persist:auth');
        localStorage.removeItem('persist:posts');
        
        // 3. Limpiar sessionStorage
        sessionStorage.clear();
        
        // 4. Redirigir
        router.push("/login");
      }
    } catch (error) {
      console.error("Error during logout:", error);
      
      // Fallback: limpiar solo la sesión actual
      dispatch(logout());
      sessionStorage.clear();
      router.push("/login");
    }
  };

  if (!isAuthenticated || !currentUser) return null;

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              📚 Bookish
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
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
              variant="ghost"
              onClick={handleLogout}
              size="small"
              className="text-gray-600 hover:text-gray-900"
            >
              Cerrar sesión
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 bg-white">
              <div className="flex items-center px-3 py-2">
                {currentUser.avatar && (
                  <Avatar
                    src={currentUser.avatar || ""}
                    alt={currentUser.name || "Usuario"}
                    size="sm"
                    border={true}
                    className="mr-3"
                  />
                )}
                <span className="text-gray-700 text-sm font-medium">
                  {currentUser.name}
                </span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                size="small"
                className="w-full justify-start text-gray-600 hover:text-gray-900"
              >
                Cerrar sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
