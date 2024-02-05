import type { Metadata } from "next";
import { Inter } from "next/font/google";
import clsx from "clsx";

import "./globals.css";
import NavBar from "@/components/NavBar/NavBar";
import { Providers } from "@/app/provers";
import Footer from "@/components/Footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "tahsin.us",
  description: "Mohammad Tahsin | Personal website | I am a software engineer, I love to code and learn new things.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={clsx(inter.className)}>
        <Providers>
          <div className="min-h-[100dvh] flex flex-col">
            <NavBar />
            <div className="container py-5 grow flex flex-col">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
