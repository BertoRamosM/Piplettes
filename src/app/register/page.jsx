'use client'
import React from "react";

const page = () => {

  return (
    <div>
      <h1>Register not available</h1>
  </div>
)

}
/* 
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;


    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-type":"application/json"
        },
        body: JSON.stringify({
          name, 
          email,
          password
        })
      })

      res.status === 201 && router.push("/")
      
    } catch (error) {
     throw new Error(error)
    }


  };
  return (
    <div className="flex items-center justify-center gap-4 flex-col">
      <form
        action=""
        className="flex items-center justify-center gap-4 flex-col"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="username"
          required
          className="bg-transparent border-2 border-zinc-500 p-2"
        />

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
          Register
        </button>
      </form>
    </div>
  )

};
 */

export default page;
