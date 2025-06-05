import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaEye, FaTrash, FaCopy, FaShareAlt } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste({ _id: pasteId }));
  };

  const handleCopy = (pasteId) => {
    const paste = pastes.find((p) => p._id === pasteId);
    if (paste) {
      navigator.clipboard.writeText(paste.content);
      toast.success("Copied to clipboard");
    }
  };

  const navigate = useNavigate();

  const [shareLink, setShareLink] = useState("");

  const [showShareBox, setShowShareBox] = useState(false);

  const handleShare = (pasteId) => {
    const url = `${window.location.origin}/pastes/${pasteId}`;
    setShareLink(url);
    setShowShareBox(true);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied successfully");
  };

  const [expandedPasteId, setExpandedPasteId] = useState(null);

  // Function to toggle content display
  const toggleContent = (id) => {
    if (expandedPasteId === id) {
      setExpandedPasteId(null); // collapse if clicked again
    } else {
      setExpandedPasteId(id);
    }
  };

  return (
    <div>
      <input
        className="p-2 rounded-2xl mt-5 min-w-[600px]"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {showShareBox && (
        <div className=" fixed inset-0 flex justify-center items-center z-50 pointer-events-none">
          <div className="bg-gray-950 bg-opacity-90 text-white rounded-xl p-6 w-80 shadow-lg relative pointer-events-auto">
            <button
              className="absolute bg-gray-900 top-2 right-3 text-gray-400 hover:text-white text-xl font-bold"
              onClick={() => setShowShareBox(false)}
            >
              <MdCancel />
            </button>

            <h2 className="text-lg font-semibold mb-4">Share this paste</h2>

            <input
              readOnly
              className="w-full bg-gray-900 border border-gray-600 rounded p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={shareLink}
            />

            <div className="flex justify-end">
              <button
                onClick={copyShareLink}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-4 space-y-6">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="relative border border-gray-600 rounded-lg p-6 min-w-[600px] text-white"
              style={{
                width: "600px", // fixed width
                height: "200px", // fixed height
                overflow: "hidden", // hide overflow content (or use 'auto' for scroll)
              }}
            >
              {/* Title and Content aligned left */}
              <div className="pr-90 pt-5 mb-4">
                {/* pr-120 = padding-right to avoid content behind buttons */}
                <h2 className="text-2xl font-semibold mb-2">{paste.title}</h2>

                {expandedPasteId === paste._id ? (
                  <p className="text-gray-300 text-xl whitespace-pre-wrap pt-2 pr-6">
                    {paste.content}
                  </p>
                ) : null}
              </div>

              {/* Buttons at bottom right */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                <button
                  onClick={() => navigate(`/?pasteId=${paste._id}`)}
                  className="text-white hover:text-gray-400"
                  title="Edit Paste"
                  aria-label="Edit"
                >
                  <FaEdit size={18} />
                </button>
                <button
                  onClick={() => navigate(`/pastes/${paste._id}`)}
                  className="text-white hover:text-gray-400"
                  title="View Paste"
                  aria-label="View"
                >
                  {expandedPasteId === paste._id ? (
                    <FaEyeSlash size={18} />
                  ) : (
                    <FaEye size={18} />
                  )}
                </button>
                <button
                  onClick={() => handleDelete(paste._id)}
                  className="text-white hover:text-gray-400"
                  title="Delete Paste"
                  aria-label="Delete"
                >
                  <FaTrash size={18} />
                </button>
                <button
                  onClick={() => handleCopy(paste._id)}
                  className="text-white hover:text-gray-400"
                  title="Copy Paste"
                  aria-label="Copy"
                >
                  <FaCopy size={18} />
                </button>
                <button
                  onClick={() => handleShare(paste._id)}
                  className="text-white hover:text-gray-400"
                  title="Share Paste"
                  aria-label="Share"
                >
                  <FaShareAlt size={18} />
                </button>
              </div>

              {/* Created at date below content */}
              <div className="pr-50 pt-13 pt-1 mt-6 text-sm text-gray">
                {new Date(paste.createAt).toLocaleDateString("en-us", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
