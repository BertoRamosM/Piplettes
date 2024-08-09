"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

const isActive = (href) => {
  if (href === "/") {
    return pathname === href; // Only active when exactly on "/"
  }
  return pathname.startsWith(href) && pathname !== "/"; // Exclude home path from partial matches
};


  return (
    <div className="w-full flex justify-between items-center py-2 px-12 bg-magenta-600 sticky top-0 text-white font-bold z-50">
      <div>
        <Link href="/" className="">
          <Image
            src="/texte.png"
            alt="les Piplettes de granville logo"
            width={100}
            height={100}
            className="object-cover"
          />
        </Link>
      </div>

      <div className="flex lg:hidden">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center z-50"
        >
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>
      </div>

      {isOpen && (
        <div className="flex lg:hidden bg-black bg-opacity-80 h-screen w-screen fixed inset-0 z-40 flex-col items-center justify-center sm:text-2xl gap-16 text-xl">
          <Link
            href="/#events"
            onClick={handleClick}
            className="hover:text-greeny-600 px-6"
          >
            Nos prochains événements
          </Link>
          <Link
            href="/events"
            onClick={handleClick}
            className="hover:text-greeny-600 px-6"
          >
            Archives
          </Link>
          <Link
            href="/about"
            onClick={handleClick}
            className="hover:text-greeny-600 px-6"
          >
            À propos de nous
          </Link>
          <Link
            href="/contact"
            onClick={handleClick}
            className="hover:text-greeny-600 px-6"
          >
            Contactez-nous
          </Link>
        </div>
      )}

      <div className="justify-between items-center hidden lg:flex">
        <Link
          href="/#events"
          className={`px-6 hover:text-greeny-600 ${
            isActive("/")
              ? "text-greeny-600 font-bold underline"
              : "text-white"
          }`}
        >
          Nos prochains événements
        </Link>
        <Link
          href="/events"
          className={`px-6 hover:text-greeny-600 ${
            isActive("/events")
              ? "text-greeny-600 font-bold underline"
              : "text-white"
          }`}
        >
          Archives
        </Link>
        <Link
          href="/about"
          className={`px-6 hover:text-greeny-600 ${
            isActive("/about")
              ? "text-greeny-600 font-bold underline"
              : "text-white"
          }`}
        >
          À propos de nous
        </Link>
        <Link
          href="/contact"
          className={`px-6 hover:text-greeny-600 ${
            isActive("/contact")
              ? "text-greeny-600 font-bold underline"
              : "text-white"
          }`}
        >
          Contactez-nous
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
  