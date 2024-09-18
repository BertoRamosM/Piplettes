import React from "react";
import BlogGallery from "./BlogGallery";
import PenIcon from "../../components/icons/PenIcon";
import Scroll from "../../utils/scrollUp/Scroll";

export const metadata = {
  title: "Les Piplettes | Blog",
  description:
    "Découvrez nos articles de blog sur les événements, les actualités et les moments marquants de Les Piplettes de Granville. Plongez dans nos récits, réflexions et partages qui témoignent de la vie de notre association culturelle.",
  robots: {
    index: true,
    follow: true,
  },
};

const BlogPage = async () => {
  let blogs = [];
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs`, {
      next: { revalidate: 700 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data = await res.json();
    blogs = data;
  } catch (err) {
    error = err.message;
  }


  return (
    <div>
      <Scroll />
      <div className="flex gap-4 h-auto items-center pb-2">
        <PenIcon />
        <h1 className="text-2xl font-bold text-left">Nos articles</h1>
      </div>
      <h2 className="pb-12 text-magenta-600 font-bold">
        Explorez nos articles de blog liés à nos événements
      </h2>
      {error ? (
        <div>Error loading data: {error}</div>
      ) : (
        <div className="">
          <BlogGallery blogs={blogs} />
        </div>
      )}
    </div>
  );
};

export default BlogPage;
