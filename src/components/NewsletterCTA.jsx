"use client";
import { useState, useEffect } from "react";
import BellIcon from "./icons/BellIcon";
import MailchimpSubscribe from "react-mailchimp-subscribe";

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
    }, 100);
  };

  const handleOpen = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsVisible(true);
      localStorage.setItem("newsletterCTAVisible", "true");
      setIsAnimating(false);
    }, 100);
  };

const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;


  return (
    <div>
      {isVisible || isAnimating ? (
        <div
          className={`fixed pt-4 sm:pt-8 bottom-4 right-8 w-auto z-40 bg-magenta-600 text-xs sm:text-base text-white p-2 sm:p-4 shadow-xl rounded-md transition-transform duration-500 ease-in-out transform ${
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
            <MailchimpSubscribe
              url={MAILCHIMP_URL}
              render={({ subscribe, status, message }) => (
                <div>
                  <div
                    className="absolute right-2 top-1 cursor-pointer font-extrabold"
                    onClick={handleClose}
                  >
                    X
                  </div>
                  <div className="flex flex-col justify-between items-center gap-4">
                    <div className="flex sm:gap-2 items-center justify-center pt-2 sm:pt-0">
                      <BellIcon />
                      <h3 className="text-lg font-bold text-white">
                        S&apos;incrire pour recevoir notre information
                      </h3>
                    </div>
                    <div>
                      <form
                        className="flex gap-2 items-center justify-center"
                        onSubmit={(e) => {
                          e.preventDefault();
                          const formData = new FormData(e.target);
                          subscribe({ EMAIL: formData.get("email") });
                        }}
                      >
                        <input
                          type="email"
                          name="email"
                          placeholder="Entrer votre Email"
                          className="p-2 rounded-lg text-black border-2 bg-transparent focus:ring-greeny-600 outline-none"
                          required
                        />
                        <button
                          type="submit"
                          className="bg-transparent border-2 border-greeny-600 text-white w-max p-2 hover:text-orangy-600 font-bold transition duration-300 hover:scale-105"
                        >
                          S`abonner
                        </button>
                      </form>
                      {status === "sending" && <div>Envoi en cours...</div>}
                      {status === "error" && (
                        <div style={{ color: "red" }}>
                          {message ||
                            "Une erreur est survenue. Veuillez réessayer plus tard."}
                        </div>
                      )}
                      {status === "success" && <div className="text-black font-bold mt-1 mr-2">Merci pour votre inscription!</div>}
                    
                    </div>
                  </div>
                </div>
              )}
            />
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
          <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-greeny-600 bg-greeny-600"></span>
        </div>
      )}
    </div>
  );
};

export default NewsletterCTA;
