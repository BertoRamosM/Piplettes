import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center py-2 px-12 bg-magenta-600 sticky top-0 text-black font-bold z-50 border-b-2 border-orangy-600">
      <div>
        <Link href="/" className="">
          <Image
            src="/texte.png"
            alt="les Piplettes de granville logo"
            width={110}
            height={110}
            className="object-cover"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/events" className="hover:text-greeny-600 px-6">
          Événements
        </Link>
        <Link href="/about" className="hover:text-greeny-600 px-6">
          À propos de nous
        </Link>
        <Link href="/contact" className="hover:text-greeny-600 px-6">
          Contact nous
        </Link>
      </div>
    </div>
  );
}

export default Navbar