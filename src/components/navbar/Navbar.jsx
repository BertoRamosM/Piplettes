"use client";
import { Link } from "next-view-transitions";
import Image from "next/image";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }
    return pathname.startsWith(href) && pathname !== "/";
  };

  const handleLogout = () => {
    signOut();
  };

  return (
    <div className="flex justify-between items-center py-4 px-12 bg-orangy-600 sticky top-0 text-white font-bold z-50">
      <div>
        <Link href="/">
          <Image
            src="/texte.png"
            alt="les Piplettes de granville logo"
            width={120}
            height={120}
            className="object-cover filter grayscale-[100%] brightness-[0%] contrast-[1000%]"
          />
        </Link>
      </div>

      <div className="flex lg:hidden">
        <button
          onClick={handleClick}
          className="flex flex-col justify-center items-center z-50"
          aria-label={isOpen ? "Close menu" : "Open menu"}
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
            href="/"
            onClick={handleClick}
            className={`px-6 ${
              isActive("/")
                ? "font-bold underline text-greeny-600"
                : "text-white hover:text-magenta-700 transition-all hover:scale-105"
            }`}
            aria-label="View upcoming events"
          >
            Nos prochains événements
          </Link>
          <Link
            href="/events"
            onClick={handleClick}
            className={`px-6 ${
              isActive("/events")
                ? "font-bold underline text-greeny-600"
                : "text-white hover:text-magenta-700 transition-all hover:scale-105"
            }`}
            aria-label="View event archives"
          >
            Archives
          </Link>
          <Link
            href="/blog"
            onClick={handleClick}
            className={`px-6 ${
              isActive("/blog")
                ? "font-bold underline text-greeny-600"
                : "text-white hover:text-magenta-700 transition-all hover:scale-105"
            }`}
            aria-label="View blog"
          >
            Blog
          </Link>
          <Link
            href="/about"
            onClick={handleClick}
            className={`px-6 ${
              isActive("/about")
                ? "font-bold underline text-greeny-600"
                : "text-white hover:text-magenta-700 transition-all hover:scale-105"
            }`}
            aria-label="Learn more about us"
          >
            Présentation
          </Link>
          <Link
            href="/contact"
            onClick={handleClick}
            className={`px-6 ${
              isActive("/contact")
                ? "font-bold underline text-greeny-600"
                : "text-white hover:text-magenta-700 transition-all hover:scale-105"
            }`}
            aria-label="Contact us"
          >
            Contact
          </Link>
        </div>
      )}

      <div className="justify-between items-center hidden lg:flex">
        <Link
          href="/"
          className={`px-6 ${
            isActive("/")
              ? "font-bold underline text-black"
              : "text-white hover:text-magenta-700 transition-all hover:scale-105"
          }`}
          aria-label="View upcoming events"
        >
          Nos prochains événements
        </Link>
        <Link
          href="/events"
          className={`px-6 ${
            isActive("/events")
              ? "font-bold underline text-black"
              : "text-white hover:text-magenta-700 transition-all hover:scale-105"
          }`}
          aria-label="View event archives"
        >
          Archives
        </Link>
        <Link
          href="/blog"
          className={`px-6 ${
            isActive("/blog")
              ? "font-bold underline text-black"
              : "text-white hover:text-magenta-700 transition-all hover:scale-105"
          }`}
          aria-label="View blog"
        >
          Blog
        </Link>
        <Link
          href="/about"
          className={`px-6 ${
            isActive("/about")
              ? "font-bold underline text-black"
              : "text-white hover:text-magenta-700 transition-all hover:scale-105"
          }`}
          aria-label="Learn more about us"
        >
          Présentation
        </Link>
        <Link
          href="/contact"
          className={`px-6 ${
            isActive("/contact")
              ? "font-bold underline text-black"
              : "text-white hover:text-magenta-700 transition-all hover:scale-105"
          }`}
          aria-label="Contact us"
        >
          Contact
        </Link>
        {status === "authenticated" && (
          <Link
            href="/admin"
            className={`px-6 ${
              isActive("/admin")
                ? "font-bold underline text-black"
                : "text-white hover:text-magenta-700 transition-all hover:scale-105"
            }`}
            aria-label="Admin"
          >
            Ajout
          </Link>
        )}
        {status === "authenticated" && (
          <button
            onClick={handleLogout}
            className="px-6 text-white font-bold underline hover:text-magenta-700 transition-all hover:scale-105"
            aria-label="Logout"
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
