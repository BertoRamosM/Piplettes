"use client";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import BellIcon from "../../components/icons/BellIcon";
import AlertIcon from "../../components/icons/AlertIcon";

const NewsLetterContact = () => {
  const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

  if (!MAILCHIMP_URL) {
    return (
      <div>
        Mailchimp URL is missing. Please check your environment variables.
      </div>
    );
  }
  return (
    <MailchimpSubscribe
      url={MAILCHIMP_URL}
      render={({ subscribe, status, message }) => (
        <div className="relative p-4 bg-transparemt rounded-lg text-zinc-800 py-16 max-w-xs">
          <div className="flex flex-col justify-between items-center gap-4">
            <div className="flex sm:gap-2 items-center justify-center pt-2 sm:pt-0 gap-4">
              <BellIcon />
              <h3 className="text-lg font-bold">
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
                  className="block p-2.5 w-full text-sm text-gray-900 bg-transparent focus:outline-greeny-600 focus:outline-double rounded-lg shadow-sm border-2 border-zinc-500 focus:ring-greeny-600 focus:border-primary-500 dark:transparent dark:placeholder-black dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  required
                />
                <button
                  type="submit"
                 className="bg-transparent border-2 border-orangy-600 text-orangy-600 w-max p-2 hover:text-greeny-600 transition duration-300 hover:scale-105 hover:border-greeny-600 cursor-pointer flex items-center justify-center font-semibold"
                >
                  S&apos;abonner
                </button>
              </form>
              <p className="text-xs w-full pt-1 justify-center text-pretty flex items-center">
             
                J&apos;accepte que mon adresse mail soit recueillie et utilisée
                dans le cadre d&apos;envoi d&apos;informations, et que mon
                consentement soit enregistré.
              </p>
              {status === "sending" && <div>Envoi en cours...</div>}
              {status === "error" && (
                <div
                  dangerouslySetInnerHTML={{ __html: message }}
                  style={{ color: "red" }}
                />
              )}
              {status === "success" && (
                <div className=" font-bold mt-1 mr-2">
                  Merci pour votre inscription!
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default NewsLetterContact;
