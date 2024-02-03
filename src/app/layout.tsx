import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import NavBar from "@/components/NavBar";
import { Providers } from "@/app/provers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mohammad Tahsin personal website",
  description: "I am a software engineer, I love to code and learn new things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className, "min-h-screen")}>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
