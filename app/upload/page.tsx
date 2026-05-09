"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleClick = () => {
    if (!file) {
      alert("Please select a file first");
      return;
    }

    alert("File selected: " + file.name);
  };

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Upload Marketplace Item
      </h1>

      <div className="border border-zinc-700 rounded-xl p-10">
        <input type="file" onChange={handleFileChange} />

        <button
          onClick={handleClick}
          className="mt-6 bg-white text-black px-6 py-3 rounded-xl"
        >
          Analyze with AI
        </button>
      </div>
    </main>
  );
}