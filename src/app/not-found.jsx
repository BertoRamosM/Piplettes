import { Link } from 'next-view-transitions';
import React from 'react'

export const metadata = {
  title: "Les Piplettes | Page non trouvée 404",
  description: "Page non trouvée.",
  /*  icons: {
    icon: "/texte.png",
  }, */
  robots: {
    index: true,
    follow: true,
  },
};

const notFound = () => {
  return (
    <div className="flex items-center justify-center flex-col gap-8 py-20">
      <h1 className="text-3xl">
        <span className="text-magenta-600 font-semibold">Oups !</span> Page non
        trouvée (404)
      </h1>
      <h2>
        On dirait que vous vous êtes égaré... Pas de panique ! Ça arrive même
        aux meilleurs.
      </h2>
      <p>Voici quelques options pour vous remettre sur le bon chemin :</p>
      <ul>
        <li>
          Retournez à notre{" "}
          <Link className="text-magenta-600 font-semibold" href="/">
            page d&apos;accueil
          </Link>{" "}
          et poursuivez votre exploration.
        </li>
        <li>
          Découvrez nos{" "}
          <Link className="text-magenta-600 font-semibold" href="/events">
            dernières événements.
          </Link>
        </li>
        <li>
          Besoin d&apos;aide ?{" "}
          <Link className="text-magenta-600 font-semibold" href="/contact">
            Contactez-nous !
          </Link>
        </li>
      </ul>
      <p>Merci de votre visite et bonne exploration ! ✨</p>
    </div>
  );
}

export default notFound;