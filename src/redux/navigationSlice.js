// sectionSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const navigationSlice = createSlice({
  name: "navigation",
  initialState: {
    section: "home",
    articles: [],
    sideArticles: [],
    searchArticles: [],
  },
  reducers: {
    setSection: (state, action) => {
      state.section = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    setSideArticles: (state, action) => {
      state.sideArticles = action.payload;
    },
    setSearchArticles: (state, action) => {
      state.searchArticles = action.payload;
    },
  },
});

// Export actions
export const { setSection, setArticles, setSideArticles, setSearchArticles } =
  navigationSlice.actions;

// Export reducer
export default navigationSlice.reducer;
