import React from "react";

const EventCard = ({ item }) => {
  return (
    <div
      key={item.imdbID}
      className="relative bg-cover bg-center h-64 w-full p-4 flex flex-col justify-end"
      style={{ backgroundImage: `url(${item.Poster})` }}
    >
      <h3>{item.Title}</h3>
      <p>{item.Year}</p>
    </div>
  );
};

export default EventCard;
