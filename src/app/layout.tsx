import type { Metadata } from "next";
import clsx from "clsx";
import "./globals.css";
import { Providers } from "@/app/provers";
import fonts from "@/lib/fonts";

import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/NavBar/NavBar";
import Footer from "@/components/Footer/Footer";

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
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
