"use client";

import { useState } from "react";
import BellIcon from "./icons/BellIcon";

const NewsletterCTA = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setStatus("sending");

      const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

      const res = await fetch(MAILCHIMP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ EMAIL: email }),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      setEmail("");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-magenta-600 text-white p-4 rounded-lg shadow-xl">
      <div className="flex items-center gap-2 mb-2">
        <BellIcon />
        <span className="font-bold">Newsletter</span>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="p-2 text-black rounded"
          required
        />

        <button
          type="submit"
          className="border px-3 py-2"
        >
          OK
        </button>
      </form>

      {status === "sending" && <p>Envoi...</p>}
      {status === "success" && <p>Merci !</p>}
      {status === "error" && <p>Erreur</p>}
    </div>
  );
};

export default NewsletterCTA;