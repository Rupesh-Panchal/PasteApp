import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ViewPaste = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  if (!paste) {
    return <p className="text-center mt-10 text-red-500">Paste not found</p>;
  }

  return (
    <div className="w-full sm:max-w-4xl h-{-24} mx-auto p-0 sm:p-1">
      <button
        onClick={() => navigate("/pastes")}
        className=" px-4 py-2 mt-1 rounded-lg bg-sky-800 text-white hover:bg-sky-900 transition"
        title="Go back to pastes"
      >
        ← Go Back
      </button>
      {/* Title */}
      <input
        disabled
        className="p-6 mt-4 rounded-2xl w-full sm:max-w-4xl pl-4 text-lg sm:text-xl font-semibold 
                   border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800
                   text-gray-900 dark:text-gray-100"
        type="text"
        value={paste.title}
        placeholder="No title"
      />

      {/* Content */}
      <textarea
        disabled
        className="border h-130 border-gray-300 dark:border-gray-600 rounded-2xl mt-4 p-4 w-full
                   min-h-[200px] sm:min-h-[300px] text-gray-900 dark:text-gray-100
                   bg-gray-100 dark:bg-gray-800 resize-y"
        value={paste.content}
        placeholder="No content"
        rows={12}
      />
    </div>
  );
};

export default ViewPaste;
