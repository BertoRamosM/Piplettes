"use client";
import React, { useState } from "react";
import Movies from "../../utils/mockMovies.json";
import EventCard from "./EventCard";
import ArchiveIcon from "@/components/icons/ArchiveIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import Scroll from "@/utils/scrollUp/Scroll";

const sortMoviesByDate = (movies) => {
 
  return movies.sort((a, b) => {
    const dateA = new Date(a.date.split("/").reverse().join("-"));
    const dateB = new Date(b.date.split("/").reverse().join("-"));
    return dateB - dateA;
  });
};

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
  };

  //sort movies by date before applying filters
  const sortedMovies = sortMoviesByDate(Movies);

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
    
    <div className="">
       <Scroll />
      <div className="flex gap-4 h-auto items-center pb-2">
        <ArchiveIcon />
        <h1 className="text-2xl font-bold text-left">Nos archives</h1>
      </div>
      <h2 className="pb-12 text-magenta-600">
        Naviguez à travers nos événements précédents.
      </h2>

      {/* search and filter */}
      <div className="flex w-full items-center justify-center gap-4 pb-4">
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
              className="bg-transparent border-2 border-zinc-500 w-full pl-10 pr-3 py-2 rounded-md outline-none"
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
              className="bg-transparent border-2 border-zinc-500 w-full pl-10 pr-3 py-2  outline-none bg-tansparent   text-gray-900 text-sm rounded-lg focus:ring-zinc-500 focus:border-zinc-500 block p-2.5 dark:bg-zinc-300 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-zinc-500 dark:focus:border-zinc-500"
            >
              <option value="">Tous les thèmes</option>
              <option value="Documentaire">Documentaire</option>
              <option value="Film">Film</option>
              <option value="Politique">Politique</option>
              <option value="Religion">Religion</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pb-4">
        {searchTerm === "" && selectedTheme === ""
          ? "Tous les films"
          : `Recherche: ${searchTerm}, Thème: ${selectedTheme}`}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-xl h-auto">
        {filteredMovies.map((item) => (
          <EventCard key={item.imdbID} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Events;
