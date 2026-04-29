import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { CookieConsentProvider } from "./components/CookieConsentProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "cookie-consent-react",
  description:
    "Webpage with production demo of npm package component cookie-consent-react.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <CookieConsentProvider />
        {children}
      </body>
    </html>
  );
}
