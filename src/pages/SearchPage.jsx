import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { setSearchArticles } from "../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import formattedDate from "../utils/formattedDate";
import Navbar from "../components/Navbar";
import logo from "../images/newyork.png";
function SearchPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const apiKey = import.meta.env.VITE_API_KEY;

  const searchArticle = useSelector((state) => state.navigation.searchArticles);
  const sectionSearch = location?.state?.data;

  useEffect(() => {
    const fetchSearchArticle = async () => {
      try {
        const responseSearchArticles = await axios.get(
          `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${sectionSearch}&api-key=${apiKey}`
        );
        dispatch(setSearchArticles(responseSearchArticles.data.response.docs));
      } catch (error) {
        /*         setError("Error fetching the news articles. Please try again later.");
         */ console.error("Error fetching the news articles:", error);
      }
    };
    fetchSearchArticle();
  }, [sectionSearch, apiKey, dispatch]);

  return (
    <div >
         <div className=" w-full border-b border-black pb-2">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-8 px-2" src={logo} alt="Logo image" />
            </Link>
          </Navbar>
        </div>
      </div>
      <div className="bg-gray-200 text-3xl py-8">
        <h1 className="max-w-[900px] mx-auto">{sectionSearch}</h1>
      </div>
      <section>
        <div className=" max-w-[900px] mx-auto">
          {searchArticle?.slice(0, 10).map((article, index) => (
            <div className="flex border-t border-black py-5" key={index}>
              <span className="block w-[14%] ">
                {formattedDate(article.pub_date)}
              </span>
              <div className="w-[60%]">
                <Link to="/Article" state={{ data: article }}>
                  <h1 className="text-2xl leading-none pb-2">
                    {article.headline.main}
                  </h1>
                  <p>{article.abstract}</p>
                </Link>
              </div>
              <div className="w-[26%]">
                {article.multimedia && article.multimedia.length > 0 && (
                  <img
                    className="w-full"
                    src={`https://www.nytimes.com/${article.multimedia[35].url}`}
                    alt={article.headline.main}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default SearchPage;
