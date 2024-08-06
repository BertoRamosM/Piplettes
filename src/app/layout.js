import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import Head from "next/head";
import NewsletterCTA from "@/components/NewsletterCTA";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Les Piplettes de Granville",
  description: " Les Piplettes de Granville",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="icon" href="/texte.png" />
      </Head>
      <body className={`${inter.className} bg-zinc-300`}>
        <Navbar />
        {children}
        <NewsletterCTA />
        <Footer />
      </body>
    </html>
  );
}
