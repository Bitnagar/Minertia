import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Minertia ◆ Mint NFTs.",
  description:
    "Minertia is a NFT minting web application that uses powerful Stable Diffusion Machine Learning Model to generate NFTs in real time.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full scroll-smooth">
      <body className={inter.className + " w-full h-full "}>
        <div className="red-gradient">
          <Header />
          {children}
          <Toaster />
          <Footer />
        </div>
      </body>
    </html>
  );
}
