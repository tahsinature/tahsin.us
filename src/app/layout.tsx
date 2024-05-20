import type { Metadata } from "next";
import clsx from "clsx";
import "./globals.css";
import { Providers } from "@/app/provers";
import fonts from "@/lib/fonts";
// import { Inter } from "next/font/google";

import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

// const inter = Inter({ subsets: ["latin"] });

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
      <body className={clsx(fonts.normalText.className)}>
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
