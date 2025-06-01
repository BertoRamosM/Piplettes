import { Roboto } from "next/font/google";
import "./globals.css";
import Footer from "../components/footer/Footer";
import Navbar from "../components/navbar/Navbar";
import NewsletterCTA from "../components/NewsletterCTA";
import { ViewTransitions } from "next-view-transitions";
import AuthProvider from "../components/AuthProvider/AuthProvider";
import { Analytics } from "@vercel/analytics/react";
import Loader from "../utils/Loader";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  default: "Les Piplettes de Granville",
  title: "Les Piplettes de Granville",
  description: "Les Piplettes de Granville | Association Culturelle",
  icons: {
    icon: "/texte.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <Analytics />
      <html lang="fr">
        <body className={`${roboto.className} bg-zinc-300`}>
          <AuthProvider>
            <Navbar />
            <main className="text-black pt-20 pb-12 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4 h-auto overflow-x-hidden">
              {children}
            </main>
           {/*  <NewsletterCTA /> */}
            <Footer />
          </AuthProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
