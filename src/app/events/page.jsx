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

// Helper function to check if the event date has passed
const isDatePassed = (dateString) => {
  if (!dateString) return false;
  const eventDate = new Date(dateString);
  const today = new Date();

  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  return eventDate < today;
};

// Main EventsPage component
const EventsPage = async () => {
  let events = [];
  let error = null;

  // Fallback for base URL if NEXT_PUBLIC_BASE_URL is undefined
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "https://your-fallback-production-url.com";

  try {
    // Log the URL being fetched (for debugging purposes)
    console.log("Fetching events from:", `${baseUrl}/api/events`);

    // Fetch the events from the API
    const res = await fetch(`${baseUrl}/api/events`);

    // If the response is not OK, throw an error
    if (!res.ok) {
      throw new Error(
        `Failed to fetch events: ${res.status} ${res.statusText}`
      );
    }

    // Parse the response as JSON
    events = await res.json();

    // Filter out events where the date has already passed
    events = events.filter((event) => isDatePassed(event.date));
  } catch (err) {
    // Log the error (for debugging purposes)
    console.error("Error fetching events:", err.message);

    // Set the error message to display to the user
    error = err.message;
  }

  return (
    <div>
      <Scroll />
      <div className="flex gap-4 h-auto items-center pb-2">
        <ArchiveIcon />
        <h1 className="text-2xl font-bold text-left">Nos archives</h1>
      </div>
      <h2 className="pb-12 text-magenta-600 font-bold">
        Naviguez à travers nos événements précédents.
      </h2>

      {error ? (
        // Display the error message if there was a problem fetching data
        <div>Error loading data: {error}</div>
      ) : (
        // Render the EventsGallery component with the fetched events
        <EventsGallery events={events} />
      )}
    </div>
  );
};

export default EventsPage;
