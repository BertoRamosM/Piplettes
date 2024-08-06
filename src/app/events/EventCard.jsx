import Button from "@/components/Button";
import React from "react";



const EventCard = ({ item }) => {
  return (
    <div
      key={item.imdbID}
      className="relative bg-cover bg-center h-80 w-full px-4 py-8 flex flex-col justify-end"
      style={{ backgroundImage: `url(${item.Poster})` }}
    >
      <div className="absolute left-0 bottom-0 w-full h-1/3 bg-black bg-opacity-50 backdrop-blur-sm flex items-start text-white px-2 flex-col justify-center">
        <h3>{item.Title}</h3>
        <p>{item.Year}</p>
        <Button text={"Aller plus loin"} />
      </div>
    </div>
  );
};

export default EventCard;
