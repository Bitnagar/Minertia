import Header from "@/components/Header";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="w-full h-full">
      <body className={inter.className + " dark w-full h-full scroll-smooth"}>
        <div className="bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-rose-300 via-rose-900 to-black">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
