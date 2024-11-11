import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import logo from "../images/newyork.webp";
function PageNotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className=" w-full border-b border-black ">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-8 " src={logo} alt="Logo image" />
            </Link>
          </Navbar>
        </div>
      </div>
      <div className="bg-gray-400 flex-grow text-center font-bold flex flex-col justify-center items-center">
         <p> Error Page not found</p>
        <Link to="/">
          <span className="hover:text-gray-600 block">Back to home</span>
        </Link>
      </div>
    </div>
  );
}

export default PageNotFound;
