import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
  Logo,
} from "@/components/icons";

export const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 py-4 bg-black bg-opacity-70 backdrop-blur-lg shadow-md">
      <Link href = "/"className="text-2xl font-bold text-white">Fridge</Link>
      <ul className="hidden md:flex space-x-8">
      </ul>
      <Link
        isExternal
        className="px-6 py-2 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition duration-300"
        href="/login"
      >
        Log In
      </Link>
    </nav>
  );
}
