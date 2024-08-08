"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "@/components/Button";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import Hero from "@/components/Hero/Hero";
import { Link } from "next-view-transitions";
import Movies from "../utils/mockMovies.json";

const sortAndSelectRecentMovies = (movies) => {
  // Parse date and sort the array
  const sortedMovies = movies.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateB - dateA;
  });

  // Return the top 3 recent movies
  return sortedMovies.slice(0, 3);
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");

  const recentMovies = sortAndSelectRecentMovies(Movies);

  const handlePrevClick = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? recentMovies.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === recentMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };



  return (
    <div className="">
      <Hero />
      <div className="flex gap-4 h-auto items-center pb-2" id="events">
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
          {recentMovies.map((movie, index) => (
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
              <div className="absolute left-0 bottom-0 w-full h-auto py-4 bg-black bg-opacity-50 backdrop-blur-xs flex items-center text-white">
                <div className="text-pretty px-12">
                  <h2 className="text-2xl font-bold pb-2">{movie.title}</h2>
                  <p className="">{movie.desc}</p>
                  <div className="flex gap-2 items-center py-2 max-w-max justify-center">
                    <CalendarIcon />
                    <p>{movie.date}</p>
                  </div>
                  <Link
                    href={`/events/${movie.id}`}
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
        <div className="absolute z-30 flex -translate-x-1/2 left-1/2 space-x-3 rtl:space-x-reverse pb-8 bottom-5">
          {recentMovies.map((_, index) => (
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
    </div>
  );
}
