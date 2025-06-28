import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import ChevronLeft from "../../../components/icons/ChevronLeft";
import ChevronRight from "../../../components/icons/ChevronRight";
import BackArrow from "../../../components/icons/BackArrow";
import { notFound } from "next/navigation";
import UpdateButton from "../../../components/UpdateButton/UpdateButton";
import BlurImage from "../../../components/BlurImage";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-GB").format(date);
};

export async function generateMetadata({ params }) {
  const { current: event } = await getDataWithNavigation(params._id);

  return {
    title: `${event.title} - Les Piplettes | Événement Culturel à Granville`,
    description: `Découvrez l'événement "${event.title}" organisé par Les Piplettes à Granville. ${event.desc}. Rejoignez-nous pour une expérience culturelle enrichissante avec des détails sur la date, le lieu et les activités prévues.`,
  };
}

async function getDataWithNavigation(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/events`, {
    /* next: { revalidate: 700 }, */
      cache: 'no-store' 
  });
  if (!res.ok) {
    return notFound();
  }

  const events = await res.json();

  const sortedEvents = events.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const currentIndex = sortedEvents.findIndex((event) => event._id === id);

  if (currentIndex === -1) {
    return notFound();
  }

  const prevMovie = currentIndex > 0 ? sortedEvents[currentIndex - 1] : null;
  const nextMovie =
    currentIndex < sortedEvents.length - 1
      ? sortedEvents[currentIndex + 1]
      : null;

  return {
    current: sortedEvents[currentIndex],
    previous: prevMovie,
    next: nextMovie,
  };
}

const EventPage = async ({ params }) => {
  const {
    current: movie,
    previous: prevMovie,
    next: nextMovie,
  } = await getDataWithNavigation(params._id);

  if (!movie) {
    return notFound();
  }
  return (
    <div className="">
      <UpdateButton eventId={movie._id} />
      <Link
        className="flex gap-2 items-center hover:text-magenta-600 pb-8 sm:pb-0 transition"
        href="/events"
      >
        <BackArrow />
        Retour aux archives
      </Link>
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl">{movie.title}</h1>
          <h3 className="text-xl">
            {movie.director}, <span className="text-sm">{movie.release}</span>
          </h3>
          <h4>
            {movie.day && `${movie.day} `}
            {movie.date && `${formatDate(movie.date)} `}
            {movie.hour && movie.hour}
            
          </h4>

          <div className="flex gap-2 flex-wrap">
            {movie.themes.map((theme, index) => (
              <Link
                href={`/blog?theme=${encodeURIComponent(theme)}`}
                key={index}
                className="border-2 border-zinc-400 p-1 rounded-xl text-xs cursor-pointer hover:opacity-60 duration-300"
              >
                {theme}
              </Link>
            ))}
          </div>
          <span className="text-zinc-500 text-pretty text-xs">
            Si ces thèmes vous intéressent, explorez nos articles de blog par
            thème.
          </span>




{movie.plus && (
  <a
    href={movie.plus}
    download
    target="_blank"
    rel="noopener noreferrer"
    className="text-magenta-500 flex gap-1 my-2 p-1 border-2 border-black max-x-auto rounded justify-center cursor-pointer"
  >
    Aller plus loin
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M5 17v-5h1.5a1.5 1.5 0 1 1 0 3H5m12 2v-5h2m-2 3h2M5 10V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1v6M5 19v1a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1M10 3v4a1 1 0 0 1-1 1H5m6 4v5h1.375A1.627 1.627 0 0 0 14 15.375v-1.75A1.627 1.627 0 0 0 12.375 12H11Z"
      />
    </svg>
    <svg
      className="w-6 h-6 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01"
      />
    </svg>
  </a>
)}


        </div>
        <div className="relative overflow-hidden">
          <BlurImage
            image={movie.image}
            alt={movie.title}
            width={200}
            height={200}
            zoomIn={true}
            className="rounded-md w-full h-full object-contain"
          />
        </div>
      </div>
      
      <h4 className="text-2xl text-bold underline pb-2">
        Présentation de l&apos;événement
      </h4>
      <div
        className="text-pretty pb-12"
        dangerouslySetInnerHTML={{ __html: movie.synopsis }}
      ></div>
      <div className="flex items-center mb-8 gap-2"></div>
      <div className="py-2 flex items-center justify-between relative">
        {prevMovie ? (
          <Link
            href={`/events/${prevMovie._id}`}
            className="flex items-center justify-center hover:text-magenta-600 absolute right-0 transition"
          >
            Archive suivante
            <ChevronRight />
          </Link>
        ) : null}

        {nextMovie ? (
          <Link
            href={`/events/${nextMovie._id}`}
            className="flex items-center justify-center hover:text-magenta-600 absolute left-0 transition"
          >
            <ChevronLeft />
            Archive précédente
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default EventPage;