"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import React, { useState, useEffect } from "react";
import Loader from "../../../../utils/Loader";
import RichTextEditor from "../../../../utils/TextEditor/TextEditor"; 

const EditEvent = ({ params }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const { id } = params;
  const [loading, setLoading] = useState(true);

  const [formValues, setFormValues] = useState({
    title: "",
    director: "",
    desc: "",
    synopsis: "", 
    image: "",
    release: "",
    date: "",
    hour: "",
    themes: "",
    plus: "",
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  useEffect(() => {
    if (id) {
      const fetchEvent = async () => {
        try {
          const res = await fetch(`/api/events/${id}`, {
            cache: "no-store",
          });
          if (!res.ok) {
            throw new Error("Failed to fetch event data");
          }

          const event = await res.json();

          if (event && event.current) {
            setFormValues({
              title: event.current.title,
              director: event.current.director,
              desc: event.current.desc,
              synopsis: event.current.synopsis, 
              image: event.current.image,
              release: event.current.release,
              date: event.current.date ? event.current.date.split("T")[0] : "",
              hour: event.current.hour || "",
              day: event.current.day,
              month: event.current.month,
              themes: event.current.themes
                ? event.current.themes.join(",")
                : "",
                plus: event.current.plus || "",
            });
            setLoading(false);
          } else {
            console.error("Event not found or failed to fetch");
          }
        } catch (error) {
          console.error("Error fetching event data:", error);
        }
      };

      fetchEvent();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSynopsisChange = (content) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      synopsis: content,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      title,
      director,
      desc,
      synopsis,
      image,
      release,
      date,
      day,
      hour,
      month,
      plus,
    } = formValues;
    const themes = formValues.themes.split(",");

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          title,
          director,
          desc,
          synopsis,
          image,
          date,
          day,
          hour,
          month,
          themes,
          release,
          plus,
        }),
      });

      if (res.status === 200) {
        router.push("/events");
      }
    } catch (error) {
      console.error("Failed to update event:", error);
      throw new Error(error);
    }
  };

  const isFormValid =
    formValues.title.trim() &&
    formValues.director.trim() &&
    formValues.desc.trim() &&
    formValues.synopsis.trim() &&
    formValues.image.trim() &&
    formValues.release.trim();
    formValues.plus.trim();

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center gap-4 flex-col w-full">
      <h1 className="self-start font-bold">Modifier un événement</h1>
      <form
        action=""
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
            placeholder="Enter event title"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Director:<span className="text-red-600"> *</span>
          <input
            type="text"
            name="director"
            required
            value={formValues.director}
            placeholder="Enter director's name"
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
            placeholder="Enter event description"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Synopsis:<span className="text-red-600"> *</span>
          <RichTextEditor
            value={formValues.synopsis}
            onSave={handleSynopsisChange}
          />
        </label>

        <label className="w-full">
          Image URL:<span className="text-red-600"> *</span>
          <input
            type="text"
            name="image"
            required
            value={formValues.image}
            placeholder="Enter image URL"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Release Year:<span className="text-red-600"> *</span>
          <input
            type="text"
            name="release"
            required
            value={formValues.release}
            placeholder="Enter release year (e.g., 2023)"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Date:
          <input
            type="date"
            name="date"
            value={formValues.date}
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Jour
          <input
            type="text"
            name="day"
            value={formValues.day}
            placeholder="e.g., Samedi"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Hour:
          <input
            type="text"
            name="hour"
            value={formValues.hour}
            placeholder="Enter event hour (e.g., 18h00)"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>

        <label className="w-full">
          Month <span className="text-red-600"> *</span>
          <input
            type="text"
            name="month"
            value={formValues.month}
            placeholder="e.g., August, 2024"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
            required
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

      
         <label className="w-full">
          Aller plus loin:
          <input
            type="text"
            name="plus"
            value={formValues.plus}
            placeholder="Enter link to download pdf. if field not empty will display button to download pdf"
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
          Update Event
        </button>
      </form>
    </div>
  );
};

export default EditEvent;
