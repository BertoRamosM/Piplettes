"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RichTextEditor from "../../utils/TextEditor/TextEditor";

const AddBlogPost = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    title: "",
    author: "",
    desc: "",
    content: "",
    date: "",
    themes: "",
  });

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
    const themesArray = themes ? themes.split(",") : [];

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

      if (res.status === 201) {
        router.push("/blog");
      }
    } catch (error) {
      console.error("Failed to add blog post:", error);
    }
  };

  const isFormValid = () => {
    return (
      formValues.title.trim() &&
      formValues.author.trim() &&
      formValues.desc.trim() &&
      formValues.content.trim() &&
      formValues.date
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full pt-12">
      <h1 className="self-start font-bold">Add a New Blog Post</h1>
      <form
        className="flex flex-col items-center justify-center gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <label className="w-full">
          Title<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="Title"
            name="title"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Author<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="Author"
            name="author"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Description<span className="text-red-600"> *</span>
          <textarea
            placeholder="Description"
            name="desc"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Content<span className="text-red-600"> *</span>
          <RichTextEditor onSave={handleContentChange} />
        </label>
        <label className="w-full">
          Date<span className="text-red-600"> *</span>
          <input
            type="date"
            name="date"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Themes
          <input
            type="text"
            placeholder="Themes (separated by commas)"
            name="themes"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <button
          type="submit"
          className={`w-max p-2 mt-2 transition duration-300 flex items-center justify-center ${
            isFormValid()
              ? "bg-transparent border-2 border-orangy-600 text-orangy-600 hover:text-greeny-600 hover:scale-105 cursor-pointer"
              : "border-2 border-zinc-500 text-zinc-500 cursor-not-allowed"
          }`}
          disabled={!isFormValid()}
        >
          Add Blog Post
        </button>
      </form>
    </div>
  );
};

export default AddBlogPost;
