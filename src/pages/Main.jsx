import { React, useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setArticles, setSideArticles } from "../redux/navigationSlice";
import { setArts, setWell } from "../redux/newsFooterSlice";

import Home from "../components/Home";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import xml2js from "xml2js"; // Import XML to JSON converter
import NewsFooter from "../components/NewsFooter";
import Footer from "../components/Footer";

export const Main = ({}) => {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_API_KEY;
  const logoRef = useRef(null);

  const [showNavbar, setShowNavbar] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    
 // If the scroll position exceeds the threshold of 300 pixels, the navbar is shown; otherwise, it is hidden.
    const handleScroll = () => {
      if (window.scrollY > 300) {
        // Adjust this value to set the scroll threshold
        setShowNavbar(true);
      } else {
        setShowNavbar(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Fetch Home Articles
  const fetchHomeArticles = async () => {
    try {
      const response = await axios.get(
        `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`
      );
      const data = response?.data?.results
      dispatch(setArticles(data));
    } catch (error) {
      console.error("Error fetching home articles:", error);
    }
  };

  // Fetch Side Articles (RSS Feed)
  const fetchSideArticles = async () => {
    try {
      const response = await axios.get(
        "https://rss.nytimes.com/services/xml/rss/nyt/Opinion.xml"
      );
      const parsedData = await new Promise((resolve, reject) => {
        xml2js.parseString(
          response.data,
          { explicitArray: false },
          (err, result) => {
            if (err) reject(err);
            else resolve(result);
          }
        );
      });
      const articles = parsedData?.rss?.channel?.item || [];
      dispatch(setSideArticles(articles));
    } catch (error) {
      console.error("Error parsing XML:", error);
    }
  };

  // Fetch Sections like 'arts' and 'well'
  const fetchNewsSections = async () => {
    const sections = [
      { name: "arts", action: setArts },
      { name: "well", action: setWell },
    ];
    try {
      const fetchSectionData = async (section) => {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/${section.name}.json?api-key=${apiKey}`
        );
        dispatch(section.action(response?.data?.results));
      };
      await Promise.all(sections.map(fetchSectionData));
    } catch (error) {
      console.error("Error fetching sections:", error);
    }
  };

  useEffect(() => {
    fetchHomeArticles();
    fetchSideArticles();
    fetchNewsSections();
  }, [dispatch]);

  return (
    <div className="max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
      <Navbar logoRef={logoRef} onMenuToggle={setIsMenuOpen}></Navbar>
      {/* // when scroll down, show the navbar */}
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-transform duration-300 ${
          showNavbar ? "-translate-y-3" : "-translate-y-full"
        }`}
      >
        <div className="bg-white  text-black shadow-md mt-0">
          <Navbar hideLogoAndDate={true} hideSearchAndLogin={true}></Navbar>
        </div>
      </div>

      <div className={`${isMenuOpen && "hidden"}`}>
        <div className="flex  lg:flex lg:flex-col  md:flex md:flex-col sm:flex sm:flex-col  ">
          <div className={"w-[70%] lg:w-full md:w-full sm:w-full"}>
            <Home imgArt="0" artStart="0" artEnd="3"></Home>
            <Home imgArt="3" artStart="3" artEnd="5"></Home>
            <Home imgArt="5" artStart="5" artEnd="6"></Home>
            <Home imgArt="6" artStart="6" artEnd="9"></Home>
            <Home imgArt="9" artStart="9" artEnd="11"></Home>
            <Home imgArt="11" artStart="11" artEnd="12"></Home>
          </div>
          <div className="w-[30%] l  lg:w-full  md:w-full sm:w-full ">
            <Sidebar></Sidebar>
          </div>
        </div>
        <NewsFooter></NewsFooter>
        <Footer logoRef={logoRef}></Footer>
      </div>
    </div>
  );
};

export default Main;
