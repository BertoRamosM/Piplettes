"use client";
import { signIn, useSession } from "next-auth/react";
import React from "react";
import AddEventForm from "../events/AddEventForm.jsx"
import AddBlogForm from "../blog/AddBlogForm.jsx"

const Admin = () => {
  const { data: session, status } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    signIn("credentials", { email, password });
  };

  return (
    <div className="flex items-center justify-center gap-4 flex-col w-full">
      {status === "authenticated" ? (
        <div className="w-full">
          <AddEventForm />
         <AddBlogForm />
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          action=""
          className="flex items-center justify-center gap-4 flex-col"
        >
          <input
            type="email"
            placeholder="email"
            required
            className="bg-transparent border-2 border-zinc-500 p-2"
          />
          <input
            type="password"
            placeholder="password"
            required
            className="bg-transparent border-2 border-zinc-500 p-2"
          />

          <button className="bg-transparent border-2 border-orangy-600 text-orangy-600 w-max p-2 mt-2 hover:text-greeny-600 transition duration-300 hover:scale-105 cursor-pointer flex items-center justify-center">
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Admin;
