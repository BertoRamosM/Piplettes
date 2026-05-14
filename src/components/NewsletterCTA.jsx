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

  const isValidMailchimpUrl =
    typeof MAILCHIMP_URL === "string" && MAILCHIMP_URL.includes("list-manage.com");

  return (
    <div>
      {isVisible || isAnimating ? (
        <div
          className={`fixed pt-4 sm:pt-8 bottom-4 right-2 left-2 sm:left-auto w-auto z-40 bg-magenta-600 text-xs sm:text-base text-white p-2 sm:p-4 shadow-xl rounded-md transition-transform duration-500 ease-in-out max-w-md transform ${
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
            isValidMailchimpUrl ? (
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

                    <div className="flex flex-col justify-center items-center gap-6">
                      <div className="flex sm:gap-2 items-center justify-center pt-2 sm:pt-0 gap-4">
                        <BellIcon />
                        <h3 className="text-lg font-bold text-white">
                          S&apos;inscrire pour recevoir nos informations
                        </h3>
                      </div>

                      <form
                        className="flex gap-2"
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
                          className="p-3 rounded-lg text-gray-800 border-2 bg-white w-fit"
                          required
                        />

                        <button
                          type="submit"
                          className="bg-transparent border-2 text-white w-max p-2 font-bold"
                        >
                          S&apos;abonner
                        </button>
                      </form>

                      {status === "sending" && <div>Envoi en cours...</div>}
                      {status === "error" && (
                        <div style={{ color: "red" }}>
                          {message || "Erreur, veuillez réessayer."}
                        </div>
                      )}
                      {status === "success" && (
                        <div className="text-black font-bold mt-1">
                          Merci pour votre inscription !
                        </div>
                      )}
                    </div>
                  </div>
                )}
              />
            ) : (
              <div className="text-white text-center p-4">
                Newsletter indisponible (configuration manquante)
              </div>
            )
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
          className="fixed bottom-4 right-4 w-auto bg-magenta-600 text-white p-4 shadow-xl rounded-lg flex items-center justify-center cursor-pointer"
          onClick={handleOpen}
        >
          <BellIcon />
        </div>
      )}
    </div>
  );
};

export default NewsletterCTA;