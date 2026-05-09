"use client";
import { useState } from "react";

import { useRouter } from "next/navigation";

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

    router.push("/marketplace");
  };
return (
  <main className="min-h-screen flex items-center justify-center relative">

    {/* Background Image */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')",
      }}
    ></div>

    {/* Dark Overlay */}
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

    {/* Login Card */}
    <div className="relative bg-white/10 backdrop-blur-lg border border-white/20 p-8 rounded-2xl w-[350px] shadow-xl">

      <h1 className="text-4xl font-bold text-center text-white mb-6">
        Student Login
      </h1>

      <input
        type="text"
        placeholder="Student Name"
        className="w-full mb-4 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="DOB (DD-MM-YYYY)"
        className="w-full mb-6 p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none"
        onChange={(e) => setDob(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-white text-black py-3 rounded-xl font-semibold hover:scale-105 transition"
      >
        Login
      </button>

    </div>
  </main>
  );
}
