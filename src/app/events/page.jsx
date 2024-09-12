import React from "react";
import EventsGallery from "../../components/EventsGallery";
import ArchiveIcon from "../../components/icons/ArchiveIcon";
import Scroll from "../../utils/scrollUp/Scroll";

export const metadata = {
  title: "Les Piplettes | Galerie d'Événements et Archives",
  description:
    "Explorez la galerie des événements passés de Les Piplettes de Granville. Revivez nos moments culturels marquants à travers des photos et des archives qui témoignent de la richesse de notre association culturelle.",
  robots: {
    index: true,
    follow: true,
  },
};

const isDatePassed = (dateString) => {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate < today;
};

const EventsPage = async () => {
  let events = [];
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`);
    if (!res.ok) {
      throw new Error("Failed to fetch events");
    }
    events = await res.json();

    events = events.filter((event) => isDatePassed(event.date));
  } catch (err) {
    error = err.message;
  }

  return (
    <div>
      <Scroll />
      <div className="flex gap-4 h-auto items-center pb-2">
        <ArchiveIcon />
        <h1 className="text-2xl font-bold text-left">Nos archives</h1>
      </div>
      <h2 className="pb-12 text-magenta-600 font-bold text-pretty">
        Elles sont classées par ordre chronologique. <br></br>Vous pouvez effectuer des
        recherches sur un évènement en particulier, par titre ou par thème.
      </h2>

      {error ? (
        <div>Error loading data: {error}</div>
      ) : (
        <EventsGallery events={events} />
      )}
    </div>
  );
};

export default EventsPage;
