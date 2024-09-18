"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import Button from "../components/Button";
import CalendarIcon from "./icons/CalendarIcon";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";
import Loader from "../utils/Loader";

const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return null;

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return null;
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

// Utility function to check if the date has passed
const isDatePassed = (dateString) => {
  if (!dateString) return false; // Treat null/empty dates as future events (do not exclude them)

  const eventDate = new Date(dateString);
  const today = new Date();

  // Reset time to the start of the day to compare only dates
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate < today;
};

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState("next");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events/upcoming", {
          next: { revalidate: 700 },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        const data = await res.json();

        const filteredEvents = data.filter((event) => {
         
          return (
            event.date === null ||
            event.date === "" ||
            !isDatePassed(event.date)
          );
        });

        setEvents(filteredEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handlePrevClick = () => {
    setDirection("prev");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setDirection("next");
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleIndicatorClick = (index) => {
    setDirection(index > currentIndex ? "next" : "prev");
    setCurrentIndex(index);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="relative w-full flex items-center justify-between h-[80vh] bg-zinc-300 bg-opacity-90 backdrop-blur-xs">
      <div
        className="absolute z-30 left-1 cursor-pointer"
        onClick={handlePrevClick}
      >
        {events.length === 0 || events.length === 1 ? null : <ArrowLeft />}
      </div>
      <div className="relative w-full h-full overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center w-full h-full">
            <Loader />
          </div>
        ) : events.length === 0 ? (
          <div className="flex justify-center items-center w-full pt-24 flex-col gap-4">
            <p className="text-3xl font-bold text-zinc-700">
              Aucun événement à venir
            </p>

            <Image
              src="/logo_complet-removebg-preview.png"
              width={300}
              height={300}
              alt="piplette logo"
            />
            <Link href={"/events"} className="">
              <Button text="Consultez nos derniers événements" />
            </Link>
          </div>
        ) : (
          events.map((event, index) => (
            <div
              key={event._id}
              className={`absolute inset-0 transition-transform duration-700 ease-in-out transform ${
                index === currentIndex
                  ? "translate-x-0 opacity-100"
                  : "translate-x-full opacity-0"
              }`}
              data-carousel-item
            >
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-contain"
                onLoadingComplete={handleImageLoad}
                priority={index === 0}
              />
              <div className="absolute left-0 bottom-0 w-full h-auto py-4 bg-black bg-opacity-70 backdrop-blur-xs flex items-center text-white">
                <div className="text-pretty px-12">
                  <h2 className="text-2xl font-bold pb-2">{event.title}</h2>
                  <p>{event.desc}</p>
                  <div className="flex gap-2 items-center py-2 max-w-max justify-center">
                    <CalendarIcon />
                    <span className="text-[#E6007E] text-lg flex flex-col">
                      <span>
                        {event.day} {event.hour}
                      </span>
                      <span>
                        {(formatDateToDDMMYYYY(event.date) &&
                          formatDateToDDMMYYYY(event.date).trim()) ||
                          event.month ||
                          "Bientôt"}
                      </span>
                    </span>
                  </div>
                  <Link
                    href={`/events/${event._id}`}
                    alt="link event"
                    className="text-orangy-600 inline-block w-fit"
                  >
                    <Button text={"Afficher les détails"} />
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        className="absolute z-30 right-1 cursor-pointer"
        onClick={handleNextClick}
      >
        {events.length === 0 || events.length === 1 ? null : <ArrowRight />}
      </div>
      <div className="absolute z-30 flex -translate-x-1/2 right-0 sm:right-auto sm:left-1/2 space-x-3 rtl:space-x-reverse pb-8 bottom-0 sm:bottom-5">
        {events.map((_, index) => (
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
};

export default Carousel;
