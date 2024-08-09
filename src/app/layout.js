import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";
import NewsletterCTA from "@/components/NewsletterCTA";
import { ViewTransitions } from "next-view-transitions";
import Scroll from "@/utils/scrollUp/Scroll";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Les Piplettes de Granville",
  description: " Les Piplettes de Granville",
};

export default function RootLayout({ children }) {
  return (
    <ViewTransitions>
      <html lang="fr">
        <Head>
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
          <link rel="icon" href="/texte.png" />
        </Head>
        <body className={`${inter.className} bg-zinc-300`}>
          <Navbar />
          <div className="text-black mt-12 pt-20 pb-12 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4 h-auto">
            {children}
          </div>
          <NewsletterCTA />
          <Footer />
        </body>
      </html>
    </ViewTransitions>
  );
}
