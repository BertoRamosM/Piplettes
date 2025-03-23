
import React from "react";
import Hero from "../components/Hero/Hero";
import TicketIcon from "../components/icons/TicketIcon";
import Carousel from "../components/Carousel";


export const metadata = {
  title: "Les Piplettes | Association Culturelle à Granville",
  description: "Découvrez Les Piplettes de Granville, une association culturelle dynamique proposant des événements, ateliers et rencontres pour promouvoir la culture et le partage. Rejoignez-nous pour explorer nos activités enrichissantes.",
/*   icons: {
    icon: "/texte.png",
  }, */
  robots: {
    index: true,
    follow: true
  }
};


export default function Home() {
  return (
    <div>
      <Hero />
      <div className="flex gap-4 h-auto items-center pb-2" id="events">
        <TicketIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Nos prochains événements
        </h1>
      </div>
      <h2 className="sm:pb-12 pb-0 text-orangy-700 font-bold">
        Découvrez ce qui arrive bientôt
      </h2>
      <Carousel />
    </div>
  );
}
