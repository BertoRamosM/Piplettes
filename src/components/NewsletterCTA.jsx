"use client";
import { useState, useEffect } from "react";
import BellIcon from "./icons/BellIcon";

const NewsletterCTA = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const storedVisibility = localStorage.getItem("newsletterCTAVisible");
    if (storedVisibility === "false") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("newsletterCTAVisible", "false");
  };

  return (
    isVisible && (
      <div className="fixed bottom-4 right-4 w-auto bg-magenta-700 text-white p-4 shadow-lg border-2 border-greeny-600 rounded-lg">
        <div
          className="absolute right-2 top-0 cursor-pointer"
          onClick={handleClose}
        >
          x
        </div>
        <div className="flex flex-col justify-between items-center gap-4">
          <div className="flex gap-2 items-center justify-center">
            <BellIcon />
            <h3 className="text-lg font-bold text-white">
              Inscrivez-vous à notre newsletter!
            </h3>
          </div>
          <div>
            <form className="flex gap-2 items-center justify-center">
              <input
                type="email"
                placeholder="Entrer votre Email"
                className="p-2 rounded-l-lg text-black border-2 bg-transparent border-orangy-600 focus:ring-greeny-600 outline-none"
                required
              />
              <button
                type="submit"
                className="bg-transparent border-2 border-greeny-600 text-greeny-600 w-max p-2 hover:text-orangy-600 font-bold transition duration-300 hover:scale-105"
              >
                S`abonner
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default NewsletterCTA;
