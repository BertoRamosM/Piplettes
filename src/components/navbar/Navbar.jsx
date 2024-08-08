import { Link } from 'next-view-transitions';
import Image from 'next/image';
import React from 'react'

const Navbar = () => {
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

      <div className="flex justify-between items-center">
        <Link href="/" className="hover:text-greeny-600 px-6">
          Nos prochains événements
        </Link>
        <Link href="/events" className="hover:text-greeny-600 px-6">
          Archives
        </Link>
        <Link href="/about" className="hover:text-greeny-600 px-6">
          À propos de nous
        </Link>
        <Link href="/contact" className="hover:text-greeny-600 px-6">
          Contactez-nous
        </Link>
      </div>
    </div>
  );
}

export default Navbar