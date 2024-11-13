import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { setSearchArticles } from "../redux/navigationSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import formattedDate from "../utils/formattedDate";
import Navbar from "../components/Navbar";
import logo from "../images/logo.webp";
import Footer from "../components/Footer";
function SearchPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const apiKey = import.meta.env.VITE_API_KEY;

  const searchArticle = useSelector((state) => state.navigation.searchArticles);
  const sectionSearch = location?.state?.data;
  console.log(searchArticle);
  

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
console.log( searchArticle
);

  return (
    <div>
      <div className=" w-full border-b border-black ">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-12 px-2" src={logo} alt="Logo image" />
            </Link>
          </Navbar>
        </div>
      </div>
      <div className="bg-gray-200 text-3xl py-8">
        <h1 className="max-w-[900px] mx-auto sm:px-3">{sectionSearch}</h1>
      </div>
      <section className="px-3">
        <div className=" max-w-[900px] mx-auto">
          {searchArticle?.slice(0, 10).map((article, index) => (
            <div className="flex border-t border-black py-5 sm:flex sm:flex-col" key={index}>
              <span className="block w-[20%] sm:order-last sm:w-full">
                {formattedDate(article.pub_date)}
              </span>
              <div className="w-[80%] sm:w-full">
                {article.multimedia && article.multimedia.length > 0 && (
                  <img
                    className=" float-right max-h-40 sm:max-h-28 right-0 ml-2 mb-2"
                    src={`https://www.nytimes.com/${article.multimedia[35].url}`}
                    alt={article.headline.main}
                  />
                )}

               <a href={article.web_url}>
                  <h1 className="text-2xl leading-none pb-2">
                    {article.headline.main}
                  </h1>
                  <p>{article.abstract}</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>   
      <div className="mx-3"> <Footer />
        </div>      
     
    </div>
  );
}

export default SearchPage;
