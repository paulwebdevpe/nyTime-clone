import React, { useState } from "react";
import logo from "../images/newyork.png";
import { Link } from "react-router-dom";

function Footer({ logoRef }) {
  const handleScrollToLogo = () => {
    if (logoRef.current) {
      logoRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [visibleSections, setVisibleSections] = useState({
    news: false,
    arts: false,
    lifestyle: false,
  });

  const toggleSection = (section) => {
    setVisibleSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  return (
    <footer>
      <div className="pt-3 border-t border-black max-w-[1200px]">
        <Link to="/" onClick={handleScrollToLogo}>
          <img className="w-[184px] h-[25px]" src={logo} alt="logo image" />
        </Link>
      </div>
      <div className="flex py-5 sm:flex sm:flex-col">
        <section className="w-4/12 sm:w-full sm:mb-3 sm:border-b-2 sm:border-black">
          {/* on mobile */}
          <button
            onClick={() => toggleSection("news")}
            className="sm:block hidden sm:w-full" type="button"
          >
            <h3 className="pb-3 font-bold block sm:text-start">NEWS</h3>
          </button>
          {/* not on mobile */}
          <h3 className="pb-3 font-bold block sm:hidden">NEWS</h3>
          <ul className={visibleSections.news ? "sm:block" : "sm:hidden "}>
            <Link to="/" onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2 ">
                Home Page
              </li>
            </Link>
            <Link to={`/us`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">U.S </li>
            </Link>
            <Link to={`/world`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">World</li>
            </Link>
            <Link to={`/politics`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">
                Politics
              </li>
            </Link>
            <Link to={`/nyregion`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">
                New York
              </li>
            </Link>
            <Link to={`/Education`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">
                Education
              </li>
            </Link>
            <Link to={`/business`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">
                Business
              </li>
            </Link>
            <Link to={`/Technology`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Tech</li>
            </Link>
            <Link to={`/science`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Science</li>
            </Link>
            <Link to={`/obituaries`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">
                Obituaries
              </li>
            </Link>
          </ul>
        </section>

        <section className="w-4/12 sm:w-full sm:mb-3 sm:border-b-2 sm:border-black">
          {/* on mobile */}
          <button
            onClick={() => toggleSection("arts")}
            className="sm:block hidden sm:w-full" type="button"
          >
            <h3 className="pb-3 font-bold block sm:text-start">ARTS</h3>
          </button>
          {/* not on mobile */}
          <h3 className="pb-3 font-bold block sm:hidden">ARTS</h3>
          <ul className={visibleSections.arts ? "sm:block" : "sm:hidden "}>
            <Link
              to={`/arts/subSection/SundayBookReview`}
              onClick={handleScrollToLogo}
            >
              <li className="hover:underline sm:py-2 sm:border-b-2">Books</li>
            </Link>
            <Link to={`/arts/subSection/Dance`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Dance</li>
            </Link>
            <Link to={`/arts/subSection/Movies`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Movies</li>
            </Link>
            <Link to={`/arts/subSection/Music`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Music</li>
            </Link>
            <Link
              to={`/arts/subSection/Television`}
              onClick={handleScrollToLogo}
            >
              <li className="hover:underline sm:py-2 sm:border-b-2">
                Television
              </li>
            </Link>
            <Link to={`/arts/subSection/Theater`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Theater</li>
            </Link>
          </ul>
        </section>
        <section className="w-4/12 sm:w-full sm:mb-3 sm:border-b-2 sm:border-black">
          {/* on mobile */}
          <button
            onClick={() => toggleSection("lifestyle")}
            className="sm:block hidden sm:w-full " type="button"
          >
            <h3 className="pb-3 font-bold block sm:text-start">LIFESTYLE</h3>
          </button>
          {/* not on mobile */}
          <h3 className="pb-3 font-bold block sm:hidden">LIFESTYLE</h3>
          <ul className={visibleSections.lifestyle ? "sm:block" : "sm:hidden "}>
            <Link to={`/health`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Health</li>
            </Link>
            <Link to={`/well`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Well</li>
            </Link>
            <Link to={`/food`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Food</li>
            </Link>
            <Link to={`/travel`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Travel</li>
            </Link>
            <Link to={`/fashion`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">Fashion</li>
            </Link>
            <Link to={`/t-magazine`} onClick={handleScrollToLogo}>
              <li className="hover:underline sm:py-2 sm:border-b-2">
                T Magazine
              </li>
            </Link>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
