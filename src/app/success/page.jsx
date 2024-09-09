import BackArrow from "../../components/icons/BackArrow";
import { Link } from "next-view-transitions";
import React from "react";

export const metadata = {
  title: "Les Piplettes | Message Envoyé avec Succès",
  description:
    "Merci de nous avoir contactés ! Votre message a été envoyé avec succès à l'équipe de Les Piplettes de Granville. Nous vous répondrons dans les plus brefs délais.",
 /*  icons: {
    icon: "/texte.png",
  }, */
  robots: {
    index: true,
    follow: true,
  },
};

const Contact = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-8 py-20">
      <h1 className="text-4xl ">
        <span className="text-magenta-600 font-bold">Merci</span> de nous avoir
        contactés!
      </h1>
      <p className="text-xl">
        Votre message a été soumis avec succès. Nous vous répondrons dès que
        possible.
      </p>
      <Link
        href="/"
        className="flex items-center justify-center gap-2 hover:text-magenta-600"
      >
        <BackArrow /> Retour à la page d&apos;accueil
      </Link>
    </div>
  );
};

export default Contact;
