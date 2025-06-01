import MessageIcon from "../../components/icons/MessageIcon";
import React from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import NewsLetterContact from "./NewsLetterContact";

export const metadata = {
  title: "Les Piplettes | Contactez-Nous",
  description:
    "Vous souhaitez en savoir plus sur Les Piplettes de Granville ou participer à nos activités culturelles ? Contactez-nous via notre formulaire pour toute question ou information. Nous sommes à votre écoute !",

  robots: {
    index: true,
    follow: true,
  },
};


const Contact = () => {
  return (
    <div className="">
      <div className="flex gap-4 h-auto items-center pb-2 ">
        <MessageIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          Contactez-nous
        </h1>
      </div>
      <h2 className="pb-12 text-greeny-600 font-bold">
        Joignez-nous facilement
      </h2>
      <div className="flex sm:items-center justify-center gap-8 flex-col sm:flex-row">
        <ContactForm />

        <div className="flex flex-col items-start justify-start text-left">
          <ContactInfo />
         {/*  <NewsLetterContact /> */}
        </div>
      </div>
    </div>
  );
};

export default Contact;
