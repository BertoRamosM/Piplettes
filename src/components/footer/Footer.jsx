import Image from "next/image";
import Link from "next/link";
import React from "react";

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
        <h1 className="font-bold text-center">Les Piplettes de Granville</h1>
      </Link>
      <div className="flex sm:flex-col font-bold gap-2 items-center sm:items-start pb-8 sm:pb-0">
        <Link href="/" className="hover:text-greeny-600 sm:px-6 px-2">
          Nos prochains événements
        </Link>
        <Link href="/events" className="hover:text-greeny-600 sm:px-6 px-2">
          Événements
        </Link>
        <Link href="/about" className="hover:text-greeny-600 sm:px-6 px-2">
          À propos de nous
        </Link>
        <Link href="/contact" className="hover:text-greeny-600 sm:px-6 px-2">
          Contactez-nous
        </Link>
      </div>
    </div>
  );
};

export default Footer;
