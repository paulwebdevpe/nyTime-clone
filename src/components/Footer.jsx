import React, { useState } from "react";
import logo from "../images/newyork.webp";
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
            className="sm:block hidden sm:w-full"
            type="button"
          >
            <h3 className="pb-3 font-bold block sm:text-start">NEWS</h3>
          </button>
          {/* not on mobile */}
          <h3 className="pb-3 font-bold block sm:hidden">NEWS</h3>
          <ul className={visibleSections.news ? "sm:block" : "sm:hidden "}>
            <li className="hover:underline sm:py-2 sm:border-b-2 ">
              <Link to="/" onClick={handleScrollToLogo}>
                Home Page
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/us`} onClick={handleScrollToLogo}>
                U.S
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/world`} onClick={handleScrollToLogo}>
                World{" "}
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/politics`} onClick={handleScrollToLogo}>
                Politics
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/nyregion`} onClick={handleScrollToLogo}>
                New York
              </Link>
            </li>

            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/Education`} onClick={handleScrollToLogo}>
                Education
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/business`} onClick={handleScrollToLogo}>
                Business
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/Technology`} onClick={handleScrollToLogo}>
                Tech
              </Link>
            </li>

            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/science`} onClick={handleScrollToLogo}>
                Science
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/obituaries`} onClick={handleScrollToLogo}>
                Obituaries{" "}
              </Link>
            </li>
          </ul>
        </section>

        <section className="w-4/12 sm:w-full sm:mb-3 sm:border-b-2 sm:border-black">
          {/* on mobile */}
          <button
            onClick={() => toggleSection("arts")}
            className="sm:block hidden sm:w-full"
            type="button"
          >
            <h3 className="pb-3 font-bold block sm:text-start">ARTS</h3>
          </button>
          {/* not on mobile */}
          <h3 className="pb-3 font-bold block sm:hidden">ARTS</h3>
          <ul className={visibleSections.arts ? "sm:block" : "sm:hidden "}>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link
                to={`/arts/subSection/SundayBookReview`}
                onClick={handleScrollToLogo}
              >
                Books
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/arts/subSection/Dance`} onClick={handleScrollToLogo}>
                Dance
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/arts/subSection/Movies`} onClick={handleScrollToLogo}>
                Movies
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/arts/subSection/Music`} onClick={handleScrollToLogo}>
                Music
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link
                to={`/arts/subSection/Television`}
                onClick={handleScrollToLogo}
              >
                Television
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link
                to={`/arts/subSection/Theater`}
                onClick={handleScrollToLogo}
              >
                Theater
              </Link>
            </li>
          </ul>
        </section>
        <section className="w-4/12 sm:w-full sm:mb-3 sm:border-b-2 sm:border-black">
          {/* on mobile */}
          <button
            onClick={() => toggleSection("lifestyle")}
            className="sm:block hidden sm:w-full "
            type="button"
          >
            <h3 className="pb-3 font-bold block sm:text-start">LIFESTYLE</h3>
          </button>
          {/* not on mobile */}
          <h3 className="pb-3 font-bold block sm:hidden">LIFESTYLE</h3>
          <ul className={visibleSections.lifestyle ? "sm:block" : "sm:hidden "}>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/health`} onClick={handleScrollToLogo}>
                Health
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/well`} onClick={handleScrollToLogo}>
                Well
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/food`} onClick={handleScrollToLogo}>
                Food
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/travel`} onClick={handleScrollToLogo}>
                Travel
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/fashion`} onClick={handleScrollToLogo}>
                Fashion
              </Link>
            </li>
            <li className="hover:underline sm:py-2 sm:border-b-2">
              <Link to={`/t-magazine`} onClick={handleScrollToLogo}>
                T Magazine{" "}
              </Link>
            </li>
          </ul>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
