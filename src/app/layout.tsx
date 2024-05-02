import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import CustomThemeProvider from "../contexts/CustomThemeProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Exchange Program Portal",
  description: "A portal for AUS exchange students applications",
};

export const viewport: Viewport = {
  width: 'device-width',
  height: 'device-height',
  initialScale: 1.0,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CustomThemeProvider>
        <AppRouterCacheProvider>
          {children}
        </AppRouterCacheProvider>
        </CustomThemeProvider>
      </body>
    </html>
  );
}
