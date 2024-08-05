import Link from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center h-16 px-12 bg-magenta-700 sticky top-0 text-white z-50">
      <div>
        <Link href="/" className="max-w-auto">
          Les Piplettes
        </Link>
      </div>

      <div className="flex justify-between items-center">
        <Link href="/events" className="hover:text-green-200 px-6">
          Événements
        </Link>
        <Link href="/about" className="hover:text-green-200 px-6">
          À propos de nous
        </Link>
        <Link href="/contact" className="hover:text-green-200 px-6">
          Contact nous
        </Link>
      </div>
    </div>
  );
}

export default Navbar