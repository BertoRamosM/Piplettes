"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Loader from "../../../../utils/Loader";
import RichTextEditor from "../../../../utils/TextEditor/TextEditor";

const EditBlogPost = ({ params }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { id } = params;
  const [loading, setLoading] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    desc: "",
    content: "",
    date: "",
    themes: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (id) {
      const fetchBlogPost = async () => {
        try {
          const res = await fetch(`/api/blogs/${id}`, {
            cache: "no-store",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch blog post data");
          }

          const blogPost = await res.json();

          if (blogPost && blogPost.current) {
            setFormValues({
              title: blogPost.current.title,
              author: blogPost.current.author,
              desc: blogPost.current.desc,
              content: blogPost.current.content,
              date: blogPost.current.date
                ? blogPost.current.date.split("T")[0]
                : "",
              themes: blogPost.current.themes
                ? blogPost.current.themes.join(",")
                : "",
            });
            setLoading(false);
          } else {
            console.error("Blog post not found or failed to fetch");
          }
        } catch (error) {
          console.error("Error fetching blog post data:", error);
        }
      };

      fetchBlogPost();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleContentChange = (content) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      content: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, author, desc, content, date, themes } = formValues;
    const themesArray = themes.split(",");

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          author,
          desc,
          content,
          date,
          themes: themesArray,
        }),
      });

      if (res.status === 200) {
        router.push("/blog");
      }
    } catch (error) {
      console.error("Failed to update blog post:", error);
      throw new Error(error);
    }
  };

  const isFormValid =
    formValues.title.trim() &&
    formValues.author.trim() &&
    formValues.desc.trim() &&
    formValues.content.trim() &&
    formValues.date;

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center gap-4 flex-col w-full">
      <h1 className="self-start font-bold">Modifier un article de blog</h1>
      <form
        className="flex items-center justify-center gap-4 flex-col w-full"
        onSubmit={handleSubmit}
      >
        <label className="w-full">
          Title:<span className="text-red-600"> *</span>
          <input
            type="text"
            name="title"
            required
            value={formValues.title}
            placeholder="Enter blog post title"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Author:<span className="text-red-600"> *</span>
          <input
            type="text"
            name="author"
            required
            value={formValues.author}
            placeholder="Enter author's name"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Description:<span className="text-red-600"> *</span>
          <textarea
            name="desc"
            required
            value={formValues.desc}
            placeholder="Enter blog post description"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Content:<span className="text-red-600"> *</span>
          <RichTextEditor
            value={formValues.content}
            onSave={handleContentChange}
          />
        </label>

        <label className="w-full">
          Date:<span className="text-red-600"> *</span>
          <input
            type="date"
            name="date"
            required
            value={formValues.date}
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Themes:
          <input
            type="text"
            name="themes"
            value={formValues.themes}
            placeholder="Enter themes (comma-separated)"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <button
          type="submit"
          className={`w-max p-2 mt-2 transition duration-300 flex items-center justify-center ${
            isFormValid
              ? "bg-transparent border-2 border-orangy-600 text-orangy-600 hover:text-greeny-600 hover:scale-105 cursor-pointer"
              : "border-2 border-zinc-500 text-zinc-500 cursor-not-allowed"
          }`}
        >
          Update Blog Post
        </button>
      </form>
    </div>
  );
};

export default EditBlogPost;
