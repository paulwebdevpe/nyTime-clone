// sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const newsFooterSlice = createSlice({
  name: "newsFooter",
  initialState: {
    arts: [],
    well: [],
  },
  reducers: {
    setArts: (state, action) => {
      state.arts = action.payload;
    },
    setWell: (state, action) => {
      state.well = action.payload;
    },
  },
});

// Export actions
export const { setArts, setWell } = newsFooterSlice.actions;

// Export reducer
export default newsFooterSlice.reducer;
