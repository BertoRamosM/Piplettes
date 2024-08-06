import React from "react";
import Movies from "../../utils/mockMovies.json";
import EventCard from "./EventCard";
import ArchiveIcon from "@/components/icons/ArchiveIcon";


 const API_KEY = "52044c78";

  const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

 

const Events = () => {
  return (
    <div className="text-black mt-12 pt-20 pb-12 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4 h-auto">
      <div className="flex gap-4 h-auto items-center pb-8">
        <ArchiveIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Nos archives
        </h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-xl h-auto">
        {Movies.Search.map((item) => (
          <EventCard key={item.imdbID} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Events;


