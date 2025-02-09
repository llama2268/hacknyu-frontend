"use client";

import { 
  Navbar as HeroNavbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem 
} from "@heroui/navbar";
import { Button, type ButtonProps } from "@heroui/button";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/icons";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

export function Navbar() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const buttonBaseProps: ButtonProps = {
    variant: "light",
    className: "text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
  };

  const actionButtonProps: ButtonProps = {
    variant: "solid",
    className: "bg-blue-600 hover:bg-blue-700 text-white font-medium dark:bg-blue-500 dark:hover:bg-blue-600"
  };

  return (
    <HeroNavbar 
      maxWidth="full" 
      className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-50"
    >
      <div className="w-full max-w-[2000px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left section */}
        <NavbarBrand className="flex items-center gap-4">
          <Logo className="h-8 w-auto text-blue-600 dark:text-blue-500" />
          <Button
            {...buttonBaseProps}
            onClick={() => router.push("/")}
          >
            Home
          </Button>
          {user && (
            <Button
              {...buttonBaseProps}
              onClick={() => router.push("/interface")}
            >
              Dashboard
            </Button>
          )}
          {user && (
            <Button
              {...buttonBaseProps}
              onClick={() => router.push("/settings")}
            >
              Settings
            </Button>
          )}
        </NavbarBrand>

        {/* Right section */}
        <NavbarContent className="flex items-center gap-4" justify="end">
          {/* Theme Toggle */}
          <NavbarItem>
            <Button
              variant="light"
              isIconOnly
              className="text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {mounted && (
                theme === 'dark' ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />
              )}
            </Button>
          </NavbarItem>

          {user ? (
            <NavbarItem>
              <Button
                {...buttonBaseProps}
                onClick={logout}
              >
                Logout
              </Button>
            </NavbarItem>
          ) : (
            <NavbarItem>
              <Button
                {...actionButtonProps}
                onClick={() => router.push("/login")}
              >
                Get Started
              </Button>
            </NavbarItem>
          )}
        </NavbarContent>
      </div>
    </HeroNavbar>
  );
} 