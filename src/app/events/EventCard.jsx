import Button from "@/components/Button";
import React from "react";

const EventCard = ({ item }) => {
  const maxTitleLength = 20;
  const shortTitle =
    item.title.length > maxTitleLength
      ? `${item.title.substring(0, maxTitleLength)}...`
      : item.title;

  const backgroundImage = item.image ? item.image : "/logo_complet.png";

  return (
    <div
      key={item.imdbID}
      className="relative bg-cover bg-center h-80 w-full px-4 py-8 flex flex-col justify-end"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute left-0 bottom-0 w-full h-2/5 bg-black bg-opacity-50 backdrop-blur-sm flex items-start text-white px-2 flex-col justify-center gap-2">
        <h3>{shortTitle}</h3>
        <p>{item.date}</p>
        <Button text={"Aller plus loin"} />
      </div>
    </div>
  );
};

export default EventCard;
