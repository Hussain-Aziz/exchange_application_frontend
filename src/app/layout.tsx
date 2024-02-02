import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import {UserProvider} from "../contexts/UserContext";
import CustomThemeProvider from "../contexts/CustomThemeProvider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <UserProvider>
        <CustomThemeProvider>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
        </CustomThemeProvider>
        </UserProvider>
      </body>
    </html>
  );
}
