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

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <Link href="/" className="text-2xl font-bold text-white">
        Fridge
      </Link>
      <ul className="hidden md:flex space-x-8"></ul>
      <div className="flex items-center space-x-4">
        <Link
          className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
          href="/login"
        >
          Log In
        </Link>
        <Link href="/settings">
          <Settings className="text-white hover:text-gray-300 transition duration-300" size={24} />
        </Link>
      </div>
    </nav>
  );
};