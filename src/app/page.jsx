import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";
import Image from "next/image";

export default function Home() {
  return (
    <div className="text-black py-20 px-8 bg-magenta-700 flex items-center flex-col">
      <h1 className="text-xl font-bold pb-6">Nos prochains événements</h1>
      <div className="w-full flex items-center justify-around">
        <ArrowLeft />
        <div className="relative w-full max-w-screen-lg h-96">
          <Image
            src="https://photos.infolocale.fr/infolocale/contribution/2024/0310/58889/_1_cover_1230-500_.jpg?rnd=20240311164751"
            alt="main page image"
            layout="fill"
            objectFit="cover"
            className=""
          />
          <div className="absolute left-0 bottom-0 w-full h-1/2 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center p-4">
              <h2 className="text-white text-2xl font-bold">
                L`Info en Bobines
              </h2>
              <p className="text-white">
                Festival de ciné rencontres qui explore la liberté de la presse
                et notre droit de savoir.
              </p>
            </div>
          </div>
        </div>
        <ArrowRight />
      </div>
    </div>
  );
}
