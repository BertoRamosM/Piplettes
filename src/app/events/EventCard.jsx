import React from "react";



const EventCard = ({ item }) => {
  return (
    <div
      key={item.imdbID}
      className="relative bg-cover bg-center h-64 w-full p-4 flex flex-col justify-end"
      style={{ backgroundImage: `url(${item.Poster})` }}
    >
      <div className="absolute left-0 bottom-0 w-full h-1/3 bg-black bg-opacity-50 backdrop-blur-sm flex items-start text-white px-2 flex-col justify-center">
        <h3>{item.Title}</h3>
        <p>{item.Year}</p>
      </div>
    </div>
  );
};

export default EventCard;
