import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/app/components/navbar";
import LoadingWrapper from "./components/LoadingWrapper";
import { Geist } from "next/font/google";

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
    <html lang="en" suppressHydrationWarning>
      <Providers>
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          geist.className
        )}
      >
        
          <LoadingWrapper>
            <div className="relative flex flex-col h-screen">
              <Navbar />
                {children}
              <footer className="w-full flex items-center justify-center py-3">
                <span className="font-medium transition-colors group-hover:text-blue-300 px-5">
                  Made by Arnab, Tyler, Eva, and Lucas
                </span>
              </footer>
            </div>
          </LoadingWrapper>
      </body>
      </Providers>
    </html>
  );
}