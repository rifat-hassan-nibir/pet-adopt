import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { getUserSession } from "@/database/session";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  title: "PetAdopt - Find Your Perfect Companion",
  description:
    "Connect loving families with pets in need. Browse adoptable pets and give them a loving home.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getUserSession();

  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${poppins.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar session={session} />
        <main id="main-content" className="grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
