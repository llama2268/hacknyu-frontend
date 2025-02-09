import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            {/* Remove container classes here to let content span full width */}
            <main className="w-full flex-grow pt-16 px-6">
              {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3 bg-black text-white">
              <span className="font-medium transition-colors group-hover:text-blue-300 px-5 text-center">
                HackNYU 2025
              </span>
              <Link
                isExternal
                className="flex items-center px-3"
                href="https://github.com/llama2268/hacknyu-frontend"
                title="Visit GitHub Repository"
              >
                <img
                  src="github-mark-white.svg"
                  alt="GitHub Logo"
                  className="h-8 w-8 transform transition-transform duration-200 group-hover:scale-125 text-center"
                />
              </Link>
              <span className="font-medium transition-colors group-hover:text-blue-300 px-5 text-center">
                Made by Arnab, Tyler, Eva, and Lucas
              </span>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}