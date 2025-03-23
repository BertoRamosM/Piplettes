import GroupIcon from "../../components/icons/GroupIcon";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Les Piplettes | À Propos de Notre Association Culturelle",
  description:
    "Découvrez Les Piplettes de Granville, une association culturelle dédiée à promouvoir la culture, l'échange et la créativité à travers des événements et des activités enrichissantes. Apprenez-en plus sur notre mission, notre équipe et nos valeurs.",
  robots: {
    index: true,
    follow: true,
  },
};

const About = () => {
  return (
    <div className="">
      <div className="flex gap-4 h-auto items-center pb-2">
        <GroupIcon />
        <h1 className="text-2xl font-bold text-black text-left">
          À propos de nous
        </h1>
      </div>
      <h2 className="pb-12 text-orangy-600 font-bold">
        Découvrez notre histoire et notre mission
      </h2>
      <div className="flex items-center justify-center gap-2 flex-col-reverse sm:flex-row">
        <div className="flex-1 text-pretty space-y-6">
          {" "}
          {/* space-y-6 adds double line spacing */}
          <p>
            Les Piplettes de Granville est une association culturelle engagée
            qui organise des projections de films et documentaires alternatifs,
            mettant en lumière des sujets critiques souvent ignorés par les
            médias traditionnels.
          </p>
          <p>
            Nos événements sont axés sur des œuvres cinématographiques et
            artistiques qui questionnent les normes sociales, critiquent le
            pouvoir en place, et ouvrent le débat sur les injustices et les
            dysfonctionnements du système.
          </p>
          <p>
            À travers ces rencontres, nous cherchons à offrir un espace de
            réflexion et d’échange pour toutes celles et ceux qui souhaitent
            explorer des perspectives nouvelles et alternatives. Loin du
            divertissement de masse, nous favorisons une culture de la
            résistance, du questionnement, et de l’émancipation collective.
          </p>
          <p>
            Chez Les Piplettes, la culture est un outil de conscientisation et
            un moyen d’action, permettant à chacun de remettre en question le
            statu quo et de participer à la construction d’une société plus
            juste et éclairée.
          </p>
        </div>

        <div className="flex-2">
          <Image
            src="/logo_complet-removebg-preview.png"
            alt=""
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
