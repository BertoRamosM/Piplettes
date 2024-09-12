'use client'
import MailchimpSubscribe from "react-mailchimp-subscribe";
import BellIcon from "../../components/icons/BellIcon";
 

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
        <div className="relative p-4 bg-transparemt rounded-lg text-zinc-800 py-16">
          <div className="flex flex-col justify-between items-center gap-4">
            <div className="flex sm:gap-2 items-center justify-center pt-2 sm:pt-0">
              <BellIcon />
              <h3 className="text-lg font-bold">
                S&apos;incrire pour recevoir notre information{" "}
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
                  className="bg-transparent border-2 border-greeny-600 w-max p-2 hover:text-orangy-600 hover:border-orangy-600 font-bold transition duration-300 hover:scale-105"
                >
                  S&apos;abonner
                </button>
              </form>
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
