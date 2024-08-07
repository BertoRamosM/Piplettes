import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const Footer = () => {
  return (
    <div className="flex justify-between items-center py-8 px-12">
      <Link
        href="/"
        alt="logo"
        className="flex gap-2 justify-center items-center "
      >
        <Image
          src="/illustration.png"
          alt="les Piplettes logo"
          width={82}
          height={82}
        />
        <h1 className="font-bold">Les Piplettes de Granville</h1>
      </Link>
      <div className="flex flex-col font-bold gap-2">
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

export default Footer