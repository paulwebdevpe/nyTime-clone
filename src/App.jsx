import React from "react";
import Main from "./pages/Main";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Main />
    </div>
  );
};

export default App;
