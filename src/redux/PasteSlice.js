import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from "react-hot-toast";

// Initial state for the Redux slice
// It initializes the `pastes` array from localStorage if available, otherwise sets it as an empty array
const initialState = {
  pastes: localStorage.getItem("pastes")
    ? JSON.parse(localStorage.getItem("pastes"))
    : [],
};

// Creating a Redux slice named "paste"
export const PasteSlice = createSlice({
  name: "paste", // The name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to handle adding a new paste
    addToPaste: (state, action) => {
      // Get the new paste data from the dispatched action payload
      const paste = action.payload;

      // Check if a paste with the same title (case-insensitive) already exists in the state
      const exist = state.pastes.some(
        (p) => p.title.toLowerCase() === paste.title.toLowerCase()
      );

      // If such a paste exists, show an error toast notification
      if (exist) {
        toast.error("Paste with same title exists");
      } else {
        // Otherwise, add the new paste to the pastes array in the state
        state.pastes.unshift(paste);

        // Update localStorage to save the updated pastes array as a JSON string
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Show a success toast notification to inform the user
        toast.success("Paste created successfully!");
      }
    },

    // Reducer to handle updating an existing paste
    updateToPaste: (state, action) => {
      // Get the updated paste data from the dispatched action payload
      const paste = action.payload;

      // Find the index of the paste to update by matching its unique ID
      const index = state.pastes.findIndex((p) => p._id === paste._id);

      // If the paste is found, update it
      if (index !== -1) {
        // Update the paste at the found index with the new data
        state.pastes[index] = paste;

        // Update localStorage with the modified pastes array
        localStorage.setItem("pastes", JSON.stringify(state.pastes));

        // Show toast for successful update
        toast("Paste updated successfully!");
      } else {
        // If not found, optionally show an error (not implemented here)
        toast.error("Paste not found");
      }
    },

    // Reducer to handle removing all pastes
    resetAllPaste: (state, action) => {
      // Clear the pastes array in the state
      state.pastes = [];

      // Update localStorage to remove all pastes
      localStorage.removeItem("pastes");

      // Show toast for successful reset
      toast("All pastes have been reset");
    },

    // Reducer to handle removing a single paste
    removeFromPaste: (state, action) => {
      // Get the paste object (containing _id) from the dispatched action payload
      const paste = action.payload;

      // Remove the paste from the state by filtering it out
      state.pastes = state.pastes.filter((p) => p._id !== paste._id);

      // Update localStorage to reflect the removal of the paste
      localStorage.setItem("pastes", JSON.stringify(state.pastes));

      // Show the toast on successful removal
      toast("Paste removed successfully");
    },
  },
});

// Exporting the action creators generated for each reducer
// These are used in components to dispatch actions
export const { addToPaste, updateToPaste, resetAllPaste, removeFromPaste } =
  PasteSlice.actions;

// Exporting the reducer function to be included in the Redux store
export default PasteSlice.reducer;
