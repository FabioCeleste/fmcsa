"use client";

import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { SearchProvider } from "@/store/searchContext";
import { AppProvider } from "@/store/appContext";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AppRouterCacheProvider>
        <SearchProvider>
          <AppProvider>
            <body className={inter.className}>{children}</body>
          </AppProvider>
        </SearchProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
