import type { Metadata } from "next";
import localFont from 'next/font/local'
import "./globals.css";
import MouseLayout from '@/components/onMous'
import HudBackground from "@/components/hudBackground";
import FullBackground from "@/components/FullBackground";

const PPSupplySans = localFont({
  src: [
    {
      path: './Supply-free/PPSupplySans-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Supply-free/PPSupplySans-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-supply-sans',
})

const PPSupplyMono = localFont({
  src: [
    {
      path: './Supply-free/PPSupplyMono-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './Supply-free/PPSupplyMono-Ultralight.otf',
      weight: '200',
      style: 'normal',
    },
  ],
  variable: '--font-supply-mono',
})

export const metadata: Metadata = {
  title: "Modern Website Design ",
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
      className={`font-[PPSupplyMono]`}
      >
        <MouseLayout>
          <HudBackground/>
          {children}
        </MouseLayout>
      </body>
    </html>
  );
}
