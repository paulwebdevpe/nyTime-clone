import React, { useState } from "react";
import search from "../images/search.svg";
import {  useNavigate } from "react-router-dom";

function SearchInput({ showImg, showInputMenu }) {
  const navigate = useNavigate(); // Initialize the navigate function

  const [showInput, setShowInput] = useState(false);
  const [inputSearch, setInputSearch] = useState("");

  // Function to handle input change
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };

  // Handle form submission
  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Navigate to the search page with the search input data
    navigate("/search", { state: { data: inputSearch } });
  };

  return (
    <div className="flex relative items-center">
      {showImg ? (
        <img
          onClick={() => setShowInput(!showInput)}
          className="cursor-pointer hover:bg-gray-400"
          src={search}
          alt="search image svg"
        />
      ) : null}

      {showInput || showInputMenu ? (
        <div
          className={
            showInput
              ? "absolute flex ml-7 mt-1"
              : "sm:flex sm:w-full md:w-full lg:w-full md:flex lg:flex"
          }
        >
          {/* Wrap the input field and button in a form */}
          <form onSubmit={handleFormSubmit} className="flex items-center">
            <input
              onChange={handleChange}
              type="text"
              placeholder="Search..."
              className={`${
                showInput
                  ? "border border-gray-300 rounded py-1 px-2 max-w-[150px] focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
                  : "sm:w-full md:w-full lg:w-full border border-gray-300 rounded py-1 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              }`}
            />
            <button
              type="submit"
              className="py-1 px-2 bg-blue-500 text-white rounded"
            >
              GO
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default SearchInput;
