"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "../../components/icons/SearchIcon";
import FilterIcon from "../../components/icons/FilterIcon";
import BlogCard from "./BlogCard";
import EmptyFace from "../../components/icons/EmptyFace";

const sortBlogsByDate = (blogs) => {
  if (!Array.isArray(blogs)) return [];
  return blogs.sort((a, b) => new Date(b.date) - new Date(a.date));
};

const BlogGallery = ({ blogs = [] }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const theme = params.get("theme");
    if (theme) {
      setSelectedTheme(theme);
    }
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleThemeChange = (event) => {
    const theme = event.target.value;
    setSelectedTheme(theme);

    router.push(`/blog?theme=${theme}`, { shallow: true });
  };

  const sortedBlogs = useMemo(() => sortBlogsByDate(blogs), [blogs]);

  const uniqueThemes = useMemo(() => {
    const themes = blogs.flatMap((blog) => blog.themes || []);
    return Array.from(new Set(themes));
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return sortedBlogs.filter((blog) => {
      const matchesSearchTerm = blog.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesTheme = selectedTheme
        ? blog.themes.includes(selectedTheme)
        : true;
      return matchesSearchTerm && matchesTheme;
    });
  }, [sortedBlogs, searchTerm, selectedTheme]);

  return (
    <div>
      <div className="flex items-center justify-center gap-4 pb-4">
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
        <div className="flex flex-col gap-8 rounded-xl w-full">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((item) => <BlogCard item={item} key={item.id} />)
          ) : (
            <div className="text-center text-gray-500 w-full flex flex-col items-center justify-center pt-4">
              <EmptyFace />
              <p>
                Aucune entrée de blog ne correspond aux critères de filtrage
                actuels.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogGallery;
