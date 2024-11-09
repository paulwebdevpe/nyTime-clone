import Slider from "react-slick";
import React from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import { useSelector } from "react-redux";
import noImage from "../images/no-image.png";
import { useRef } from "react";
import { Link } from "react-router-dom";

function Carousel() {
  const sideArticles = useSelector((state) => state.navigation.sideArticles);
  const sliderRef = useRef(null); // Create a ref for the Slider component

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
  };
  return (
    <section className="slider-container relative ">
      <Slider ref={sliderRef} {...settings}>
        {sideArticles?.slice(1, 5).map((sideArticle, index) => (
          <div key={index} className={`${index % 2 === 0 ? "pr-2" : "pl-2"} `}>
            <Link to="/Article" state={{ data: sideArticle }}>
              <img
                src={sideArticle["media:content"]?.$.url || noImage}
                alt="Article"
                className="w-full "
              />
              <h3 className="text-lg   text-center mt-2 hover:text-gray-600">
                {sideArticle.title || "Untitled"}
              </h3>
            </Link>
          </div>
        ))}
      </Slider>
      {/* Previous Button */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-gray-400 hover:bg-gray-700 text-white p-4 rounded-full mr-2" alt="click to slide left"
          onClick={() => sliderRef.current?.slickPrev()} // Call slickPrev to go to the previous slide
        >
          <FaArrowAltCircleLeft />
        </button>

        {/* Next Button */}
        <button
          className="bg-gray-400 hover:bg-gray-700 text-white p-4 rounded-full" alt="click to slide right"
          onClick={() => sliderRef.current?.slickNext()} // Call slickNext to go to the next slide
        >
          <FaArrowAltCircleRight />
        </button>
      </div>
    </section>
  );
}

export default Carousel;
