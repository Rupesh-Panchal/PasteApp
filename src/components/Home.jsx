import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { addToPaste, updateToPaste } from "../redux/PasteSlice";

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");

  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  const createPaste = () => {
    if (!title && !value) {
      toast.error("You have not mentioned the Title yet");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    setTitle("");
    setValue("");
    setSearchParam({});
  };

  return (
    <div className="min-h-screen py-4 mt-6 pt-15 flex items-start justify-center px-2 sm:px-4">
      <div className="w-full max-w-4xl bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-8 sm:p-14 border border-gray-200 dark:border-gray-700">
        <h2 className="text-3xl sm:text-5xl font-bold text-center mb-10">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h2>

        <div className="flex flex-col gap-6 sm:gap-8">
          <input
            className="p-5 text-lg rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here..."
          />

          <textarea
            className="p-5 text-lg rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white placeholder-gray-500 h-72 sm:h-96 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your content..."
          />

          <button
            onClick={createPaste}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-4 px-8 rounded-xl transition text-xl shadow-md hover:shadow-lg"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
