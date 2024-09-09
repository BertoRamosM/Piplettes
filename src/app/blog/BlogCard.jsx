import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import UserIcon from "../../components/icons/UserIcon";
import CalendarIcon from "../../components/icons/CalendarIcon";
import Button from "../../components/Button";
import { Link } from "next-view-transitions";


const formatDateToDDMMYYYY = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

const BlogCard = ({ item }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const deleteModalRef = useRef(null);

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
      const res = await fetch(`/api/blogs/${item._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        router.push("/blog");
      } else {
        console.error("Failed to delete blog post");
      }
    } catch (error) {
      console.error("An error occurred while deleting the blog post:", error);
    }
    closeDeleteModal();
  };

  return (
    <div
      key={item._id}
      className="border-2 border-zinc-400 mx-4 sm:mx-0 px-4 py-4 rounded-md relative shadow-lg"
    >
      <h1 className="sm:text-2xl font-semibold pb-2 ">{item.title}</h1>

      <p className="pb-2 text-sm sm:text-base">{item.desc}</p>
      <div className="flex gap-2 flex-wrap pb-4">
        {item.themes.map((theme, index) => (
          <div
            className="border-2 border-zinc-400 p-1 rounded-xl text-xs cursor-default"
            key={index}
          >
            {theme}
          </div>
        ))}
      </div>
      <div className="flex items-center text-xs sm:text-sm text-zinc-600 w-full gap-2 pb-2 font-bold">
        <UserIcon />
        <p>{item.author}</p>
      </div>
      <div className="flex items-center text-xs pb-4 text-gray-500 w-full gap-2">
        <CalendarIcon />
        <p>{formatDateToDDMMYYYY(item.date)}</p>
      </div>

      <Link href={`/blog/${item._id}`}>
        <Button text="En savoir plus" />
      </Link>

      {status === "authenticated" && (
        <div className="absolute top-2 right-2 flex flex-col gap-2 z-10">
          <Link href={`/blog/edit/${item._id}`}>
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
            Voulez-vous vraiment supprimer cet article de blog ? Cette action
            est irréversible.
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

export default BlogCard;
