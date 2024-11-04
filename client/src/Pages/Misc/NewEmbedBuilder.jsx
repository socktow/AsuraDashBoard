import React from "react";

const NewEmbedBuilder = () => {
  return (
    <div className="flex justify-center items-center h-screen ">
      <a
        href="/embed"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-slate-500 text-white text-xl font-bold w-48 h-16 flex items-center justify-center border-2 border-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
      >
        Open Embed Page
      </a>
    </div>
  );
};

export default NewEmbedBuilder;
