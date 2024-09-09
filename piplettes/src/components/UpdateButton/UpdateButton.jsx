"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const UpdateButton = ({ eventId }) => {
  const { status } = useSession();
  const deleteModalRef = useRef(null);
  const router = useRouter();

  if (status !== "authenticated") return null;

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
      const res = await fetch(`/api/events/${eventId}`, {
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
    <>
      <div className="flex gap-4 pb-4">
        <Link href={`/events/edit/${eventId}`}>
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
    </>
  );
};

export default UpdateButton;
