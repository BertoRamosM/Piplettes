"use client";
import { useState, useEffect } from "react";
import BellIcon from "./icons/BellIcon";

const MailchimpFormWithToggle = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Load Mailchimp validation script on mount
    const script = document.createElement("script");
    script.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js";
    script.async = true;
    document.body.appendChild(script);

    // Load visibility state from localStorage
    const storedVisibility = localStorage.getItem("newsletterCTAVisible");
    if (storedVisibility === "false") setIsVisible(false);

    return () => {
      document.body.removeChild(script);
    };
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

  return (
    <div>
      {(isVisible || isAnimating) ? (
        <div
          className={`fixed bottom-4 right-2 left-2 sm:left-auto z-40 max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-gray-900 transition-transform duration-500 ease-in-out
            ${isVisible ? (isAnimating ? "animate-slide-out-right" : "animate-slide-in-right") : "animate-slide-out-right"}
          `}
          onAnimationEnd={() => {
            if (!isVisible) setIsAnimating(false);
          }}
          role="region"
          aria-label="Newsletter signup form"
        >
          {isVisible ? (
            <form
              action="https://piplettes-granville.us11.list-manage.com/subscribe/post?u=4259d8a7dae521c25a028aa24&amp;id=d895eecf26&amp;f_id=003ff2e1f0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              className="flex flex-col gap-4"
              target="_blank"
              noValidate
            >
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">
                  S&apos;inscrire pour recevoir notre information
                </h2>
                <button
                  type="button"
                  onClick={handleClose}
                  aria-label="Close newsletter signup form"
                  className="text-gray-600 hover:text-gray-900 text-xl font-bold leading-none"
                >
                  &times;
                </button>
              </div>

              <label htmlFor="mce-EMAIL" className="font-medium">
                Email Address <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                required
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-greeny-600 focus:border-greeny-600 transition"
                placeholder="Entrer votre Email"
              />

              {/* Hidden anti-bot field */}
              <div style={{ position: "absolute", left: "-5000px" }} aria-hidden="true">
                <input
                  type="text"
                  name="b_4259d8a7dae521c25a028aa24_d895eecf26"
                  tabIndex={-1}
                  value=""
                  readOnly
                />
              </div>

              <button
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="bg-magenta-600 hover:bg-magenta-700 text-white font-semibold py-3 rounded-lg transition-colors duration-300"
              >
                S&apos;abonner
              </button>

              <p className="text-xs text-gray-600">
                J&apos;accepte que mon adresse mail soit recueillie et utilisée dans le cadre d&apos;envoi d&apos;informations, et que mon consentement soit enregistré.
              </p>
            </form>
          ) : (
            <div
              className="flex items-center justify-center cursor-pointer p-4 text-magenta-600 hover:text-magenta-800"
              onClick={handleOpen}
              role="button"
              tabIndex={0}
              aria-label="Open newsletter signup form"
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
            >
              <BellIcon />
            </div>
          )}
        </div>
      ) : (
        <div
          className="fixed bottom-4 right-4 w-auto bg-magenta-600 text-white p-4 shadow-xl rounded-lg flex items-center justify-center cursor-pointer transition-transform duration-500 ease-in-out transform animate-slide-in-right"
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Open newsletter signup form"
          onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleOpen(); }}
        >
          <BellIcon />
          <span className="animate-ping absolute top-1 right-0.5 block h-1 w-1 rounded-full ring-2 ring-greeny-600 bg-greeny-600"></span>
        </div>
      )}
    </div>
  );
};

export default MailchimpFormWithToggle;
