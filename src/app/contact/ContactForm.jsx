"use client";

import React, { useState } from "react";
import { sendContactForm } from "../../../lib/api";
import { useRouter } from "next/navigation";

const initValues = {
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [values, setValues] = useState(initValues);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = ({ target }) => {
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      await sendContactForm(values);
      router.push("/success");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 flex-1 pb-4 sm:pb-0">
      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-bold text-black"
        >
          Email<span className="text-red-600"> *</span>
        </label>
        <input
          name="email"
          type="email"
          id="email"
          className="block p-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-zinc-500 shadow-sm focus:outline-greeny-500 focus:outline-double focus:ring-primary-500 focus:border-primary-500 dark:bg-transparent dark:placeholder-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Votre adresse e-mail"
          required
          value={values.email}
          onChange={handleChange}
        />
      </div>
      <div>
        <label
          htmlFor="subject"
          className="block mb-2 text-sm font-bold text-black"
        >
          Sujet<span className="text-red-600"> *</span>
        </label>
        <input
          name="subject"
          type="text"
          id="subject"
          className="block p-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-zinc-500 shadow-sm focus:outline-greeny-700 focus:outline-double focus:ring-primary-500 focus:border-primary-500 dark:bg-transparent dark:placeholder-black dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
          placeholder="Dites-nous comment nous pouvons vous aider"
          required
          value={values.subject}
          onChange={handleChange}
        />
      </div>
      <div className="sm:col-span-2">
        <label
          htmlFor="message"
          className="block mb-2 text-sm font-bold text-black"
        >
          Votre message<span className="text-red-600"> *</span>
        </label>
        <textarea
          name="message"
          id="message"
          rows="6"
          className="block p-2.5 w-full text-sm text-gray-900 bg-transparent focus:outline-greeny-600 focus:outline-double rounded-lg shadow-sm border-2 border-zinc-500 focus:ring-greeny-600 focus:border-primary-500 dark:transparent dark:placeholder-black dark:text-black dark:focus:ring-primary-500 dark:focus:border-primary-500"
          placeholder="Laisser un message..."
          required
          value={values.message}
          onChange={handleChange}
        ></textarea>
      </div>

      {error && <div className="text-red-600 font-bold">{error}</div>}

      <button
        type="submit"
        className={`w-max p-2 mt-2 font-bold transition duration-300 ${!values.email || !values.subject || !values.message
            ? "border-2 border-zinc-500 text-zinc-500"
            : "bg-transparent border-2 border-orangy-600 text-orangy-600 hover:text-greeny-600 hover:scale-105"
          }`}
        disabled={
          !values.email || !values.subject || !values.message || isSubmitting
        }
      >
        {isSubmitting ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
};

export default ContactForm;