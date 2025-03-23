"use client";

import React, { useMemo, useState } from "react";
import SearchIcon from "../components/icons/SearchIcon";
import FilterIcon from "../components/icons/FilterIcon";
import EventCard from "../app/events/EventCard";
import EmptyFace from "../components/icons/EmptyFace";


const sortMoviesByDate = (movies) => {
  return movies.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const EventsGallery = ({ events }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  const sortedMovies = sortMoviesByDate(events);

    const uniqueThemes = useMemo(() => {
      const themes = events.flatMap((event) => event.themes || []);
      return Array.from(new Set(themes));
    }, [events]);

  const filteredMovies = sortedMovies.filter((movie) => {
    const matchesSearchTerm = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme
      ? movie.themes.includes(selectedTheme)
      : true;
    return matchesSearchTerm && matchesTheme;
  });

  return (
    <div>
      <div className="flex w-full items-center justify-center pb-4 flex-col sm:flex-row gap-4">
        <div className="flex flex-col pb-4 flex-1">
          <label htmlFor="search" className="pb-2">
            Recherche par titre
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              type="text"
              id="search"
              placeholder="Rechercher"
              value={searchTerm}
              onChange={handleSearchChange}
              className="bg-transparent border-2 border-zinc-500 w-full pl-10 pr-3 py-2 rounded-md outline-none shadow-lg"
            />
          </div>
        </div>

        <div className="flex flex-col pb-4 flex-1">
          <label htmlFor="filter" className="pb-2">
            Filtrer par thème
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FilterIcon />
            </div>
            <select
              id="filter"
              value={selectedTheme}
              onChange={handleThemeChange}
              className="bg-transparent border-2 border-zinc-500 w-full pl-10 pr-3 py-2 outline-none text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block p-2.5 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-zinc-500 dark:focus:border-zinc-500 shadow-lg"
            >
              <option value="">Tous les thèmes</option>
              {uniqueThemes.map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="pb-4">
        {searchTerm === "" && selectedTheme === "" ? (
          "Tous les articles"
        ) : (
          <>
            Recherche:{" "}
            <span className="text-magenta-600 font-semibold">{searchTerm}</span>
            , Thème:{" "}
            <span className="text-magenta-600 font-semibold">
              {selectedTheme}
            </span>
          </>
        )}
      </div>

      <div className="flex items-center justify-center">
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-xl w-full">
            {filteredMovies.map((item) => (
              <EventCard
                key={item._id}
                item={{ ...item, date: formatDateToDDMMYYYY(item.date) }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 w-full flex flex-col items-center justify-center pt-4">
            <EmptyFace />
            <p>
              Aucun événement ne correspond aux critères de filtrage actuels.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsGallery;
