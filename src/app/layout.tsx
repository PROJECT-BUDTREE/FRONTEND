import { Suspense } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import RecoilProvider from "./config/RecoilProvider";
import ReactQueryProvider from "./config/ReactQueryProvider";
import BottomLayout from "./components/BottomLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "버드 나무",
  description: "당신 곁에 있는 버드 나무",
  viewport: "width=device-width, initial-scale=1.0",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryProvider>
      <RecoilProvider>
        <html lang="en">
          <head>
            <link
              href="https://fonts.googleapis.com/icon?family=Material+Icons"
              rel="stylesheet"
            />
          </head>
          <body className="frame">
            <div className="layout-wrapper">
              <Suspense fallback={<div>로딩 중...</div>}>
                <main className="content-scroll">{children}</main>
              </Suspense>
              <BottomLayout />
            </div>
          </body>
        </html>
      </RecoilProvider>
    </ReactQueryProvider>
  );
}
