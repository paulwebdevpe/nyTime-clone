import React from "react";
import { Link } from "react-router-dom";
function PageNotFound() {
  return (
    <div className="bg-gray-400 min-h-full text-center font-bold ">
      Error Page not found
      <Link to="/"><p className="hover:text-gray-600">Back to home</p></Link>
    </div>
  );
}

export default PageNotFound;
