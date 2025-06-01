"use client";

import React, { useState } from "react";

const initValues = {
  email: "",
  subject: "",
  message: "",
};

const ContactForm = () => {
  const [values, setValues] = useState(initValues);

  const handleChange = ({ target }) => {
    setValues((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  return (
    <form
      name="contact"
      method="POST"
      data-netlify="true"
      action="/merci"
      className="space-y-8 flex-1 pb-4 sm:pb-0"
    >
      {/* Required hidden input for Netlify */}
      <input type="hidden" name="form-name" value="contact" />

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
          className="block p-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-zinc-500 shadow-sm"
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
          className="block p-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-zinc-500 shadow-sm"
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
          className="block p-2.5 w-full text-sm text-gray-900 bg-transparent rounded-lg shadow-sm border-2 border-zinc-500"
          placeholder="Laisser un message..."
          required
          value={values.message}
          onChange={handleChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className={`w-max p-2 mt-2 font-bold transition duration-300 ${
          !values.email || !values.subject || !values.message
            ? "border-2 border-zinc-500 text-zinc-500"
            : "bg-transparent border-2 border-orangy-600 text-orangy-600 hover:text-greeny-600 hover:scale-105"
        }`}
        disabled={!values.email || !values.subject || !values.message}
      >
        Envoyer le message
      </button>
    </form>
  );
};

export default ContactForm;
