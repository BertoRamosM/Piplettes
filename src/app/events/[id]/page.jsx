import React from "react";
import Movies from "../../../utils/mockMovies.json";
import Image from "next/image";
import { Link } from "next-view-transitions";
import ChevronLeft from "@/components/icons/ChevronLeft";
import ChevronRight from "@/components/icons/ChevronRight";

const EventPage = ({ params }) => {
  // Sort the movies by date in descending order (newest to oldest)
  const sortedMovies = [...Movies].sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateB - dateA;
  });

  // Find the current movie by id
  const currentMovieIndex = sortedMovies.findIndex(
    (movie) => movie.id === params.id
  );
  const movie = sortedMovies[currentMovieIndex];

  // Determine the previous and next movies based on the sorted order
  const prevMovie =
    currentMovieIndex < sortedMovies.length - 1
      ? sortedMovies[currentMovieIndex + 1]
      : null;
  const nextMovie =
    currentMovieIndex > 0 ? sortedMovies[currentMovieIndex - 1] : null;

  return (
    <div className="">
      <div className="flex gap-4 items-center justify-between pb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl">{movie.title}</h1>
          <h3 className="text-xl">
            {movie.director}, <span className="text-sm">{movie.release}</span>
          </h3>

          <div className="flex gap-2">
            {movie.themes.map((theme, index) => (
              <div
                className="border-2 border-zinc-400 p-1 rounded-xl"
                key={index}
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
        <Image src={movie.image} alt={movie.title} width={200} height={200} priority />
      </div>
      <h4 className="text-2xl text-bold underline pb-2">Synopsis</h4>
      <p className="text-pretty pb-12">{movie.synopsis}</p>
      <div className="py-8 flex items-center justify-between">
        {prevMovie && currentMovieIndex < sortedMovies.length - 1 ? (
          <Link
            href={`/events/${prevMovie.id}`}
            className="flex items-center justify-center hover:text-magenta-600"
          >
            <ChevronLeft />
            Précédent
          </Link>
        ) : (
          <div />
        )}
        {nextMovie && currentMovieIndex > 0 ? (
          <Link
            href={`/events/${nextMovie.id}`}
            className="flex items-center justify-center hover:text-magenta-600"
          >
            Suivant
            <ChevronRight />
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
};

export default EventPage;
