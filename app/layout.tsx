import React from "react";
import { ClerkProvider } from "@clerk/nextjs";
// eslint-disable-next-line camelcase
import { Inter, Space_Grotesk } from "next/font/google";
import type { Metadata } from "next";
import { ThemeProvider } from "@/context/ThemeProvider";
import "./globals.css";
import "../styles/prism.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-spaceGrotesk",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dev-overflow-coral.vercel.app/"),
  title: {
    default: "DevFlow",
    template: "%s | DevFlow",
  },
  description:
    "DevFlow is a community-driven platform for developers to share their work and collaborate with others. A place to share knowledge and better understand the world",
  icons: "/assets/iamges/site-logo.svg",
  keywords: "devflow, dev, flow, developer, programming, questions, answers",
  applicationName: "DevFlow",
  authors: { name: "Stefan Ylimäki", url: "https://github.com/StefanYlimaki" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable}`}>
        <ClerkProvider
          appearance={{
            elements: {
              formButtonPrimary: "primary-gradient",
              footerActionLink: "primary-text-gradient hover:text-primary-500",
            },
          }}
        >
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
