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
    <div className="bg-gray-300 dark:bg-gray-900 py-8 px-4 sm:px-8">
      <div className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-6 sm:p-10 border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl sm:text-4xl font-bold text-center text-gray-800 dark:text-white mb-6">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h2>

        <div className="flex flex-col gap-4 sm:gap-6">
          <input
            className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here..."
          />

          <textarea
            className="p-4 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 h-60 sm:h-72 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter your content..."
          />

          <button
            onClick={createPaste}
            className="bg-purple-600 hover:bg-purple-700 text-yellow-100 font-semibold py-3 px-6 rounded-xl transition text-lg shadow-md hover:shadow-lg"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
