import { configureStore } from "@reduxjs/toolkit";
import navigationReducer from "./navigationSlice"; // Ensure this path is correct
import newsFooterReducer from "./newsFooterSlice"; // Ensure this path is correct

export default configureStore({
  reducer: {
    navigation: navigationReducer,
    newsFooter: newsFooterReducer,
  },
});
