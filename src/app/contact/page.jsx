import Button from "@/components/Button";
import MessageIcon from "@/components/icons/MessageIcon";
import React from "react";

const Contact = () => {
  return (
    <div className="text-black mt-12 pt-20 pb-20 flex flex-col w-full mx-auto lg:w-[920px] rounded-xl px-4">
      <div className="flex gap-4 h-auto items-center pb-8">
        <MessageIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Contactez-nous
        </h1>
      </div>
      <form action="#" className="space-y-8">
        <div>
          <label
            htmlFor="subject"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Sujet
          </label>
          <input
            type="text"
            id="subject"
            className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
            placeholder="Dites-nous comment nous pouvons vous aider"
            required
          />
        </div>
        <div className="sm:col-span-2">
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
          >
            Votre message
          </label>
          <textarea
            id="message"
            rows="6"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder="Laisser un message..."
          ></textarea>
        </div>
        
        <Button
          type="submit"
          className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          text={"Envoyer le message"}
          />
       
      </form>
    </div>
  );
};

export default Contact;
