import LocationIcon from "@/components/icons/LocationIcon";
import MailIcon from "@/components/icons/MailIcon";
import MessageIcon from "@/components/icons/MessageIcon";
import PhoneIcon from "@/components/icons/PhoneIcon";
import React from "react";

const Contact = () => {
  return (
    <div className="text-black mt-12 pt-20 pb-12 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4 h-screen">
      <div className="flex gap-4 h-auto items-center pb-8">
        <MessageIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Contactez-nous
        </h1>
      </div>
      <div className="flex items-center justify-center gap-8">
        <form action="#" className="space-y-8 flex-1">
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-bold text-black"
            >
              Sujet
            </label>
            <input
              type="text"
              id="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-orangy-600 shadow-sm focus:outline-greeny-600 focus:outline-double focus:ring-primary-500 focus:border-primary-500 dark:bg-transparent dark:placeholder-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="Dites-nous comment nous pouvons vous aider"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-bold text-black"
            >
              Votre message
            </label>
            <textarea
              id="message"
              rows="6"
              className="block p-2.5 w-full text-sm text-gray-900 bg-transparent focus:outline-greeny-600 focus:outline-double rounded-lg shadow-sm border-2 border-orangy-600 focus:ring-greeny-600 focus:border-primary-500 dark:transparent dark:placeholder-black dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Laisser un message..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-transparent border-2 border-greeny-600 text-greeny-600 w-max p-2 mt-2 hover:text-greeny-600  font-bold transition duration-300 hover:scale-105"
          >
            Envoyer le message
          </button>
        </form>
        <div className="flex-2 flex items-end flex-col gap-8">
          <div className="flex gap-2 justify-start">
            <PhoneIcon />
            <h4>07 50 51 13 48</h4>
          </div>
          <div className="flex gap-2">
            <MailIcon />
            <h4>piplettes@proton.me</h4>
          </div>
          <div className="flex gap-2">
            <LocationIcon />
            <h4>Granville</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
