import Image from "next/image";
import Link from "next/link";
import React from "react";
import LinkIcon from "../../components/icons/LinkIcon"

const Footer = () => {
  return (
    <div className="flex justify-between items-center flex-col-reverse sm:flex-row py-6 sm:py-12 px-4 sm:px-12 text-xs sm:text-sm w-full">
      <Link
        href="/"
        alt="logo"
        className="flex gap-2 justify-center items-center mt-4 sm:mt-0"
      >
        <Image
          src="/illustration.png"
          alt="Les Piplettes logo"
          width={82}
          height={82}
        />
        <h1 className="font-bold text-center">
          <span>© Les Piplettes de Granville</span>
          <Link
            href="https://albertoramos.dev/"
            className="flex gap-2 cursor-pointer"
          >
            {" "}
            <LinkIcon /> Web by Alberto Ramos{" "}
          </Link>
        </h1>
      </Link>
      <div className="flex sm:flex-col font-bold gap-2 items-between sm:items-start pb-8 sm:pb-0 text-center">
        <Link href="/" className="hover:text-greeny-600 sm:px-6 px-2">
          Nos prochains événements
        </Link>
        <Link href="/events" className="hover:text-greeny-600 sm:px-6 px-2">
          Archives
        </Link>
        <Link href="/blog" className="hover:text-greeny-600 sm:px-6 px-2">
          Blog
        </Link>
        <Link href="/about" className="hover:text-greeny-600 sm:px-6 px-2">
          À propos
        </Link>
        <Link href="/contact" className="hover:text-greeny-600 sm:px-6 px-2">
          Contact
        </Link>
      </div>
    </div>
  );
};

export default Footer;
