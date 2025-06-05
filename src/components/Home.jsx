import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/PasteSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";

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
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-3xl border border-gray-200 rounded-2xl p-6 shadow">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6 border-b pb-2">
          {pasteId ? "Edit Your Paste" : "Create a New Paste"}
        </h1>

        <div className="flex flex-col gap-4">
          <input
            className="p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title here"
          />

          <textarea
            className="p-4 border border-gray-300 rounded-xl h-64 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter content here"
          />

          <button
            onClick={createPaste}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-xl transition"
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
