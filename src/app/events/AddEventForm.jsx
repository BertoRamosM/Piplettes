"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import RichTextEditor from "../../utils/TextEditor/TextEditor"

const AddEvent = () => {
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    title: "",
    director: "",
    desc: "",
    synopsis: "", 
    image: "",
    release: "",
    date: "",
    hour: "",
    day: "",
    month: "",
    themes: "",
    plus: "",
  });

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
      hour,
      day,
      month,
      themes,
      plus,
    } = formValues;

    const themesArray = themes ? themes.split(",") : [];

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          director,
          desc,
          synopsis,
          image,
          date: date || undefined,
          hour: hour || undefined,
          day: day || undefined,
          month,
          themes: themesArray,
          release,
          plus: plus || undefined,
        }),
      });

      if (res.status === 201) {
        router.push("/events");
      }
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const isFormValid = () => {
    return (
      formValues.title.trim() &&
      formValues.director.trim() &&
      formValues.desc.trim() &&
      formValues.synopsis.trim() &&
      formValues.image.trim() &&
      formValues.release.trim() &&
      formsValues.plus.trim()
    );
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full border-b-4 border-magenta-600 pb-12">
      <h1 className="self-start font-bold">Ajouter un nouvel événement</h1>
      <form
        className="flex flex-col items-center justify-center gap-4 w-full"
        onSubmit={handleSubmit}
      >
        <label className="w-full">
          Titre<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="Titre"
            name="title"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Réalisateur<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="Réalisateur"
            name="director"
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
          Synopsis<span className="text-red-600"> *</span>
          <RichTextEditor onSave={handleSynopsisChange} />
        </label>
        <label className="w-full">
          Image URL<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="Image URL"
            name="image"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Année de sortie du film<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="e.g., 2024"
            name="release"
            required
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Date
          <input
            type="date"
            name="date"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Heure
          <input
            type="text"
            placeholder="Heure (e.g., 14h00)"
            name="hour"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Jour
          <input
            type="text"
            placeholder="Jour (e.g., Samedi)"
            name="day"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Mois et année<span className="text-red-600"> *</span>
          <input
            type="text"
            placeholder="Mois et année (e.g., Août, 2024) ne s'affichera que s'il n'y a pas de date précise"
            name="month"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
        <label className="w-full">
          Thèmes
          <input
            type="text"
            placeholder="Thèmes (séparés par des virgules, sans espace)"
            name="themes"
            className="bg-transparent border-2 border-zinc-500 p-2 w-full"
            onChange={handleInputChange}
          />
        </label>
         <label className="w-full">
          Aller plus loin
          <input
            type="text"
            placeholder="Add URL to download pdf. if field not empty will display button to download pdf"
            name="plus"
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
          Ajouter l`événement
        </button>
      </form>
    </div>
  );
};

export default AddEvent;
