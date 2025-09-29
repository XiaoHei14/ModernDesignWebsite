import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MouseLayout from '@/components/onMous'
import HudBackground from "@/components/hudBackground";

export const metadata: Metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
      suppressHydrationWarning
      >
        <MouseLayout>
          <HudBackground/>
          {children}
        </MouseLayout>
      </body>
    </html>
  );
}
