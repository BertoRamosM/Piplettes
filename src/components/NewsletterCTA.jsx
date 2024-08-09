"use client";
import { useState, useEffect } from "react";
import BellIcon from "./icons/BellIcon";

const NewsletterCTA = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedVisibility = localStorage.getItem("newsletterCTAVisible");
    if (storedVisibility === "false") {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("newsletterCTAVisible", "false");
      setIsAnimating(false);
    }, 100); // Match the animation duration
  };

  const handleOpen = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem("newsletterCTAVisible", "true");
      setIsAnimating(false);
    }, 100); 
  };

  return (
    <div>
      {isVisible || isAnimating ? (
        <div
          className={`fixed bottom-4 right-8 w-auto bg-magenta-600 text-white p-4 shadow-xl rounded-lg transition-transform duration-500 ease-in-out transform ${
            isVisible
              ? isAnimating
                ? "animate-slide-out-right"
                : "animate-slide-in-right"
              : "animate-slide-out-right"
          }`}
          onAnimationEnd={() => {
            if (!isVisible) setIsAnimating(false);
          }}
        >
          {isVisible ? (
            <div>
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
                      className="p-2 rounded-l-lg text-black border-2 bg-transparent  focus:ring-greeny-600 outline-none"
                      required
                    />
                    <button
                      type="submit"
                      className="bg-transparent border-2 border-greeny-600 text-white w-max p-2 hover:text-orangy-600 font-bold transition duration-300 hover:scale-105"
                    >
                      S`abonner
                    </button>
                  </form>
                </div>
              </div>
            </div>
          ) : (
            <div
              className="flex items-center justify-center p-4 cursor-pointer"
              onClick={handleOpen}
            >
              <BellIcon />
            </div>
          )}
        </div>
      ) : (
        <div
          className="fixed bottom-4 right-4 w-auto bg-magenta-600 text-white p-4 shadow-xl  rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500 ease-in-out transform animate-slide-in-right"
          onClick={handleOpen}
        >
          <BellIcon />
          <span class="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-greeny-600 bg-greeny-600"></span>
        </div>
      )}
    </div>
  );
};

export default NewsletterCTA;
