import React from "react";
import Main from "./pages/Main";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Main />
      <Outlet /> 
    </div>
  );
};

export default App;
