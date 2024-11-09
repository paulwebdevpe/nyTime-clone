import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import "./index.css";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer autoClose={3000} />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
