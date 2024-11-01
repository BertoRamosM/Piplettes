import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";

const Hero = () => {
  return (
    <section className="">
      <div className="container mx-auto flex flex-col px-4 text-pretty md:px-10 lg:px-32 pb-24 jutify-center">
        <div className="flex items-end">
          <Image src={"/texte.png"} alt="logo" width={180} height={140} />

          <h2 className="text-xl font-bold leading-none pl-1 pt-2 pb-2">
          Informer -
            <span className="text-magenta-600"> Débattre</span>- Réfléchir
          </h2>
        </div>
        <div className="flex flex-col justify-center gap-2 relative mt-8">
          <h3 className="text-lg">Pourquoi les <span className="text-magenta-600">Piplettes</span> ?</h3>
          <p className=" mb-4 text-md">
          Parce qu’elles aiment bien débattre sur les questions de société qui impactent nos
vies et celles des générations futures.
          </p>
          <h3 className="text-lg">Que font-elles ?</h3>
          <p className=" text-md">
          Non, non, les <span className="text-magenta-600">Piplettes</span> ne passent pas leur temps qu’à discuter ou boire du café ;
          elles organisent aussi des ciné-rencontres et même des conférences… <Link href={"/about"} className="text-magenta-600 hover:text-greeny-500 transition-all duration-300">en savoir +</Link>
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
                  className="bg-transparent border-2 border-magenta-600 text-magenta-600 w-max p-2 mt-2 hover:text-greeny-600 hover:border-greeny-600 transition duration-300 hover:scale-105 cursor-pointer flex items-start justify-start font-bold h-max"
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
