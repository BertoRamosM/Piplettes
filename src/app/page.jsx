import Button from "@/components/Button";
import ArrowLeft from "@/components/icons/ArrowLeft";
import ArrowRight from "@/components/icons/ArrowRight";
import CalendarIcon from "@/components/icons/CalendarIcon";
import TicketIcon from "@/components/icons/TicketIcon";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-black mt-12 pt-20 pb-20  flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4">
      <div className="flex gap-4 h-auto items-center pb-8 px-12">
        <TicketIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Nos prochains événements
        </h1>
      </div>
      <div className="w-full flex items-center justify-between">
        <div className="absolute z-50 left-12 cursor-pointer">
          <ArrowLeft />
        </div>
        <div className="relative w-full w-screen-lg h-screen">
          <Image
            src="https://photos.infolocale.fr/infolocale/contribution/2024/0310/58889/_1_cover_1230-500_.jpg?rnd=20240311164751"
            alt="main page image"
            layout="fill"
            objectFit="cover"
            className=""
          />
          <div className="absolute left-0 bottom-0 w-full h-1/3 bg-black bg-opacity-50 backdrop-blur-sm flex items-center text-white">
            <div className="text-pretty px-12">
              <h2 className=" text-2xl font-bold pb-2">L`Info en Bobines</h2>
              <p className="">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Molestiae odit ea eveniet, eligendi saepe aliquid rem voluptates
                animi. Magni, necessitatibus?
              </p>
              <div className="flex gap-2 items-center py-2 max-w-max justify-center">
                <CalendarIcon />
                <p>26 Février</p>
              </div>

              <Link href="#" alt="link event" className="text-orange-300">
                <Button text={"Aller plus loin"} />
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute z-50 right-12 cursor-pointer">
          <ArrowRight />
        </div>
      </div>
    </div>
  );
}
