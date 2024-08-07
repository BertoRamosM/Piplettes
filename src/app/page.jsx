'use client';
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import Hero from "@/components/Hero/Hero";

const movies = [
  {
    id: "1",
    title: "La Fille de Brest",
    director: "Emmanuel Bercot",
    desc: "La Fille de Brest est un film français réalisé par Emmanuelle Bercot, sorti en France le 23 novembre 2016.",
    synopsis:
      "Dans son hôpital de Brest, une pneumologue découvre un lien direct entre des morts suspectes et la prise d'un médicament commercialisé depuis 30 ans, le Mediator. De l`isolement des débuts à l`explosion médiatique de l`affaire, l`histoire inspirée de la vie d`Irène Frachon est une bataille de David contre Goliath pour voir enfin triompher la vérité",
    image: "https://fr.web.img3.acsta.net/pictures/16/09/20/11/58/588230.jpg",
    date: "Vendredi 23/06 20:00h",
  },
  {
    id: "2",
    title: "Media Crash",
    director: "Valentine Oberti et Luc Hermann",
    desc: "Qui a tué le débat public?",
    synopsis:
      "Il y a ce que vous voyez, ce que certains souhaitent que vous voyiez, et ce que vous ne voyez pas. Jamais la France n’a connu une telle concentration des médias privés. Quelques industriels milliardaires, propriétaires de télévisions, radios, journaux utilisent leurs médias pour défendre leurs intérêts privés. Au détriment de l'information d’intérêt public. En cachant ce qui est essentiel, en grossissant ce qui est accessoire, ces médias façonnent, orientent, hystérisent pour certains le débat. Avec la complicité de certains responsables politiques, qui s`en accommodent volontiers. Mediapart et Premières Lignes vous racontent les coulisses des grands médias.",
    image: "https://fr.web.img4.acsta.net/pictures/22/02/01/16/26/1880267.jpg",
    date: "Samedi 24/06 14:00h",
  },
  {
    id: "3",
    title: "Hacking Justice",
    director: "Clara López Rubio, Juan Pancorbo",
    desc: "In 2012, Julian Assange, editor of WikiLeaks, takes refuge in the Embassy of Ecuador in London.",
    synopsis:
      "Voici l’histoire glorieuse et bouleversante de Julian Assange et de sa traque menée par les États-Unis et leurs vassaux dans une nouvelle version de l’éternel combat de Spartacus contre l’Empire. Suivant pas à pas la défense du fondateur de WikiLeaks, coordonnée par l’avocat espagnol Baltasar Garzón, mondialement connu pour avoir fait interpeller l’ancien dictateur chilien Augusto Pinochet, les réalisateurs ont parcouru le monde pendant neuf ans pour retisser cette histoire aux implications politiques profondes. Dans une démocratie, la liberté d’informer est un minimum vital et ne peut être une option, quelles que soient nos opinions politiques. Cette histoire concerne chacun d’entre nous.",
    image: "https://fr.web.img6.acsta.net/pictures/21/11/02/17/51/5403060.jpg",
    date: "Dimanche 25/06 14:30h",
  },
];

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const handlePrevClick = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  return (
    <div className="text-black mt-12 pt-20 pb-20 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4 relative">
      <Hero />
      <div className="flex gap-4 h-auto items-center pb-2">
        <TicketIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Nos prochains événements
        </h1>
      </div>
      <h2 className="pb-12 text-orangy-600">Découvrez ce qui arrive bientôt</h2>
      <div className="relative w-full flex items-center justify-between h-screen bg-black bg-opacity-90 backdrop-blur-xs">
        <div
          className="absolute z-30 left-4 cursor-pointer"
          onClick={handlePrevClick}
        >
          <ArrowLeft />
        </div>
        <div className="relative w-full h-full overflow-hidden">
          {movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : direction === "next"
                  ? "translate-x-full opacity-0"
                  : "translate-x-full opacity-0"
              }`}
              data-carousel-item
            >
              <Image
                src={movie.image}
                alt={movie.title}
                layout="fill"
                className="object-contain"
              />
              <div className="absolute left-0 bottom-0 w-full h-1/3 bg-black bg-opacity-50 backdrop-blur-xs flex items-center text-white">
                <div className="text-pretty px-12">
                  <h2 className="text-2xl font-bold pb-2">{movie.title}</h2>
                  <p className="">{movie.desc}</p>
                  <div className="flex gap-2 items-center py-2 max-w-max justify-center">
                    <CalendarIcon />
                    <p>{movie.date}</p>
                  </div>
                  <Link
                    href="#"
                    alt="link event"
                    className="text-orangy-600 inline-block w-fit"
                  >
                    <Button text={"Aller plus loin"} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div
          className="absolute z-30 right-4 cursor-pointer"
          onClick={handleNextClick}
        >
          <ArrowRight />
        </div>
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 bottom-20 left-1/2 space-x-3 rtl:space-x-reverse pb-8">
        {movies.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-orangy-600" : "bg-zinc-300"
            }`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
