import React from "react";
import Image from "next/image";
import { Link } from "next-view-transitions";
import BackArrow from "../../../components/icons/BackArrow";
import { notFound } from "next/navigation";


export async function generateMetadata({ params }) {
  const blog = await getBlogData(params._id);

  return {
    title: `${blog.title} - Les Piplettes | Blog`,
    description: `${blog.desc}. Découvrez plus de détails sur ce sujet à travers notre article de blog.`,
  };
}

async function getBlogData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogs` );
  if (!res.ok) {
    return notFound();
  }

  const blogs = await res.json();
  const blog = blogs.find((item) => item._id === id);

  if (!blog) {
    return notFound();
  }

  return blog;
}

const BlogPage = async ({ params }) => {
  const blog = await getBlogData(params._id);

  if (!blog) {
    return notFound();
  }

  return (
    <div className="">
      <Link
        className="flex gap-2 items-center hover:text-magenta-600 pb-16 transition"
        href="/blog"
      >
        <BackArrow />
        Retour au blog
      </Link>
      <div className="flex flex-col sm:flex-row gap-4 justify-between pb-8 ">
        <div className="flex flex-col gap-2">
          <h1 className="sm:text-5xl font-semibold">{blog.title}</h1>
          <h3 className="text-sm sm:text-xl">
            {blog.author},{" "}
          </h3>

          <div className="flex gap-2 flex-wrap">
            {blog.themes.map((theme, index) => (
              <div
                className="border-2 border-zinc-400 p-1 rounded-xl text-xs cursor-pointer hover:opacity-60"
                key={index}
              >
                {theme}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="text-pretty pb-12"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      ></div>
    </div>
  );
};

export default BlogPage;
