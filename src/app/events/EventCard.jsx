import Button from "../../components/Button";
import Image from "next/image";
import React, { useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Link } from "next-view-transitions";
import BlurImage from "../../components/BlurImage";

const EventCard = ({ item }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const deleteModalRef = useRef(null);

  const maxTitleLength = 20;
  const shortTitle =
    item.title.length > maxTitleLength
      ? `${item.title.substring(0, maxTitleLength)}...`
      : item.title;

  const backgroundImage = item.image ? item.image : "/logo_complet.png";

  const openDeleteModal = () => {
    if (deleteModalRef.current) {
      deleteModalRef.current.style.display = "flex";
    }
  };

  const closeDeleteModal = () => {
    if (deleteModalRef.current) {
      deleteModalRef.current.style.display = "none";
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/events/${item._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        router.push("/events");
      } else {
        console.error("Failed to delete event");
      }
    } catch (error) {
      console.error("An error occurred while deleting the event:", error);
    }
    closeDeleteModal(); 
  };

  return (
    <div className="relative h-80 w-full px-4 py-8 flex flex-col justify-end ">
      <BlurImage
        image={backgroundImage}
        alt={shortTitle}
        width={800}
        height={600}
          className="absolute inset-0 z-0"
      />

      <Link href={`/events/${item._id}`}>
        <div
          key={item._id}
          className="absolute left-0 bottom-0 w-full h-2/5 bg-black bg-opacity-70 backdrop-blur-sm flex items-start text-white px-2 flex-col justify-between py-4 z-10"
        >
          <h3>{shortTitle}</h3>
          <p className="text-xs">{item.date}</p>
          <Button text={"Afficher les détails"} />
        </div>
      </Link>

      {status === "authenticated" && (
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <Link href={`/events/edit/${item._id}`}>
            <button className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition duration-200">
              Mettre à jour
            </button>
          </Link>

          <button
            onClick={openDeleteModal}
            className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition duration-200"
          >
            Supprimer
          </button>
        </div>
      )}

      <div
        ref={deleteModalRef}
        className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50"
        style={{ display: "none" }}
      >
        <div className="bg-zinc-200 rounded-lg shadow-lg p-8 text-center max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-4">Êtes-vous sûr ?</h2>
          <p className="mb-8">
            Voulez-vous vraiment supprimer cet événement ? Cette action est
            irréversible.
          </p>
          <div className="flex justify-around">
            <button
              onClick={handleDelete}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-200"
            >
              Supprimer
            </button>
            <button
              onClick={closeDeleteModal}
              className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Annuler
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
