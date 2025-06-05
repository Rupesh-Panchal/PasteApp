import React, { useEffect } from "react"; // Import React library (optional in latest React versions but still common)
import { useState } from "react"; // Import useState hook for managing component state
import { useParams, useSearchParams } from "react-router-dom"; // Import hook to read & manipulate URL query parameters
import { addToPaste, updateToPaste } from "../redux/PasteSlice"; // Import Redux action creators
import { useDispatch, useSelector } from "react-redux"; // Import hook to dispatch Redux actions
import { toast } from "react-hot-toast";

const ViewPaste = () => {
  const { id } = useParams();

  const allpastes = useSelector((state) => state.paste.pastes);

  const paste = allpastes.find((p) => p._id === id);

  console.log("Final result", paste);

  return (
    <div>
      {/* Container with flex layout to place input and button side by side */}
      <div className="flex flex-row gap-7 place-content-between">
        {/* Title input box */}
        <input
          disabled
          className="p-1 rounded-2xl mt-2 w-[66%] pl-4" // Styling: padding, rounded corners, margin-top, width, padding-left
          type="text" // Input type text
          value={paste.title} // Controlled input bound to 'title' state
          onChange={(e) => setTitle(e.target.value)} // Update title state on input change
          placeholder="Enter title here" // Placeholder text
        />
      </div>

      {/* Textarea for paste content */}
      <div>
        <textarea
          disabled
          className="border-2 rounded-2xl mt-4 min-w-[500px] p-4" // Styling: border, rounded corners, margin-top, min width, padding
          value={paste.content} // Controlled textarea bound to 'value' state
          onChange={(e) => setValue(e.target.value)} // Update content state on textarea change
          placeholder="Enter content here" // Placeholder text
          rows={20} // Number of visible text lines
        />
      </div>
    </div>
  );
};

export default ViewPaste;
