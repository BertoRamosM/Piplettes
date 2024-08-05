import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center h-16 px-6 bg-red-700 sticky top-0">
      <div>
        <Link href="/" className="max-w-auto">
          Les Piplettes
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/events" className="hover:text-green-200 px-2">
          Événements
        </Link>
        <Link href="/about" className="hover:text-green-200 px-2 border-l-2">
          À propos de nous
        </Link>
        <Link href="/contact" className="hover:text-green-200 px-2 border-l-2">
          Contact nous
        </Link>
      </div>
    </div>
  );
}

export default Navbar