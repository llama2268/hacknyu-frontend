import Link from "next/link";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";
import { Settings } from "lucide-react";
import { Button } from "@heroui/button";

export const Navbar = () => {
  return (
    <nav className="sticky top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <Link href="/" className="text-2xl font-bold text-white">
        Fridge
      </Link>
      <ul className="hidden md:flex space-x-8"></ul>
      <div className="flex items-center space-x-4">
        <Link
          href="/login"
        >
          <Button className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
          >
          Log In
          </Button>
        </Link>
        <Link href="/settings">
          <Settings className="text-white hover:text-gray-300 transition duration-300" size={24} />
        </Link>
      </div>
    </nav>
  );
};