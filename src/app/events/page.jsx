import React from "react";
import Movies from "../../utils/mockMovies.json";
import EventCard from "./EventCard";


 const API_KEY = "52044c78";

  const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

 

const Events = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {Movies.Search.map((item) => (
        <EventCard key={item.imdbID} item={item} />
      ))}
    </div>
  );
};

export default Events;


