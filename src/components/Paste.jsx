import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPaste } from "../redux/PasteSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaEye,
  FaTrash,
  FaCopy,
  FaShareAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { BiLogoGmail } from "react-icons/bi";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [shareLink, setShareLink] = useState("");
  const [showShareBox, setShowShareBox] = useState(false);
  const [expandedPasteId, setExpandedPasteId] = useState(null);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste({ _id: pasteId }));
    toast.success("Paste deleted");
  };

  const handleCopy = (pasteId) => {
    const paste = pastes.find((p) => p._id === pasteId);
    if (paste) {
      navigator.clipboard.writeText(paste.content);
      toast.success("Copied to clipboard");
    }
  };

  const handleShare = (pasteId) => {
    const url = `${window.location.origin}/pastes/${pasteId}`;
    setShareLink(url);
    setShowShareBox(true);
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(shareLink);
    toast.success("Link copied successfully");
  };

  const toggleContent = (id) => {
    setExpandedPasteId(expandedPasteId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto mt-9 px-4 sm:px-6 lg:px-8 pt-0">
      <input
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-lg p-3 mt-9 rounded-full border border-gray-600 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-8 mt-1"
      />

      {/* Share Box Modal */}
      {showShareBox && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="rounded-xl bg-purple-800 p-6 w-80 shadow-lg relative text-white">
            <button
              onClick={() => setShowShareBox(false)}
              className="absolute top-2 right-3 text-gray-400 hover:text-white text-2xl"
              aria-label="Close Share Box"
            >
              <MdCancel />
            </button>

            <h2 className="text-xl font-semibold mb-4">Share the paste</h2>

            <input
              type="text"
              readOnly
              value={shareLink}
              className="w-full bg-purple-900 border border-purple-700 rounded px-3 py-2 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex flex-col space-y-3">
              <button
                onClick={copyShareLink}
                className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition text-yellow-100 font-semibold"
              >
                Copy Link
              </button>

              <div className="flex items-center gap-4 justify-center mt-4">
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    shareLink
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-green-700 px-4 py-2 rounded transition"
                  aria-label="Share on WhatsApp"
                >
                  <FaWhatsapp className="text-green-400 text-3xl" />
                </a>

                <a
                  href={`mailto:?subject=Check this paste&body=${encodeURIComponent(
                    shareLink
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:bg-red-700 px-4 py-2 rounded transition"
                  aria-label="Share via Email"
                >
                  <BiLogoGmail className="text-red-400 text-3xl" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Paste List */}
      <div className="space-y-8">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div
              key={paste._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer mx-auto w-full max-w-md"
              style={{ minHeight: "150px" }}
              onClick={() => toggleContent(paste._id)}
            >
              {/* Title */}
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3">
                  {paste.title}
                </h2>

                {/* Content (toggle) */}
                {expandedPasteId === paste._id ? (
                  <p className="text-lg text-gray-800 dark:text-gray-300 whitespace-pre-wrap mb-4 max-h-48 overflow-auto">
                    {paste.content}
                  </p>
                ) : (
                  <p className="text-lg text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                    {paste.content}
                  </p>
                )}
              </div>

              {/* Created Date */}
              <div className="text-right">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 select-none">
                  Created on:{" "}
                  {new Date(paste.createAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-5 justify-end text-gray-600 dark:text-gray-400">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/?pasteId=${paste._id}`);
                  }}
                  title="Edit Paste"
                  aria-label="Edit Paste"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  <FaEdit size={22} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/pastes/${paste._id}`);
                  }}
                  title="View Paste"
                  aria-label="View Paste"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition p-1 sm:p-2"
                >
                  <FaEye className="sm:hidden" size={14} />
                  <FaEye className="hidden sm:inline" size={20} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(paste._id);
                  }}
                  title="Delete Paste"
                  aria-label="Delete Paste"
                  className="hover:text-red-600 dark:hover:text-red-400 transition "
                >
                  <FaTrash size={22} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(paste._id);
                  }}
                  title="Copy Paste Content"
                  aria-label="Copy Paste Content"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  <FaCopy size={22} />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(paste._id);
                  }}
                  title="Share Paste"
                  aria-label="Share Paste"
                  className="hover:text-purple-600 dark:hover:text-purple-400 transition"
                >
                  <FaShareAlt size={22} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
            No pastes found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Paste;
