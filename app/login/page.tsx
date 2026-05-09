"use client";
import { useState } from "react";

const students = [
  { name: "Aarav Sharma", dob: "14-03-2004", password: "Aarav@123" },
  { name: "Priya Verma", dob: "22-07-2003", password: "Priya@123" },
  { name: "Rohan Mehta", dob: "09-11-2004", password: "Rohan@123" },
  { name: "Sneha Iyer", dob: "17-01-2005", password: "Sneha@123" },
  { name: "Aditya Rao", dob: "30-08-2003", password: "Aditya@123" },
];

export default function LoginPage() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");

  const handleLogin = () => {
    const user = students.find(
      (s) => s.name === name && s.dob === dob
    );

    if (!user) {
      alert("Invalid Name or DOB ❌");
      return;
    }

    window.location.href = "/marketplace";
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="bg-zinc-900 p-8 rounded-xl w-[350px]">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Student Login
        </h1>

        <input
          type="text"
          placeholder="Student Name"
          className="w-full mb-4 p-3 rounded bg-zinc-800"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          placeholder="DOB (DD-MM-YYYY)"
          className="w-full mb-6 p-3 rounded bg-zinc-800"
          onChange={(e) => setDob(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-white text-black py-3 rounded-xl"
        >
          Login
        </button>

      </div>
    </main>
  );
}
