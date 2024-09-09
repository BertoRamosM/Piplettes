import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";

const Hero = () => {
  return (
    <section className="">
      <div className="container mx-auto flex flex-col px-4 text-pretty md:px-10 lg:px-32 pb-24">
        <h1 className="text-4xl font-bold leading-none sm:text-5xl">
          <span className="text-orangy-600">Les Piplettes </span>
          de Granville
        </h1>
        <h2 className="text-xl font-bold leading-none pl-1 pt-2">
          Explorez,
          <span className="text-magenta-600"> Découvrez</span>, Débattez
        </h2>
        <div className="flex flex-col items-center justify-center gap-2 relative">
          <p className="mt-4 mb-12 text-lg">
            Situés à Granville (50400), nous, Les Piplettes de Granville, nous
            spécialisons dans les arts et la culture, avec un accent particulier
            sur le cinéma. Engagez-vous dans nos Ciné Débats pour des
            discussions enrichissantes et stimulantes après chaque projection.
          </p>
          <div className="flex items-center justify-between w-full flex-col sm:flex-row">
            <div className="relative w-64  h-64 mb-4">
              <Image
                src="/illustration.png"
                alt="Les Piplettes logo"
                fill
                className="object-contain"
                priority={true}
              />
            </div>

            <div className="flex flex-wrap justify-center text-black">
              <Link href="#events">
                <button
                  aria-label="Voir nos prochains événements"
                  className="bg-transparent border-2 border-magenta-600 text-magenta-600 w-max p-2 mt-2 hover:text-greeny-600 transition duration-300 hover:scale-105 cursor-pointer flex items-start justify-start font-bold h-max"
                >
                  Nos prochains événements
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
