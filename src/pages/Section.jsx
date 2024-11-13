import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import noImage from "../images/no-image.webp";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../images/logo.webp";
import formattedDate from "../utils/formattedDate";

function Section() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const { sectionId } = useParams(); // Extract sectionId from URL parameters
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      // Set loading to true before fetching
      setError(false); // Reset error state before fetching
      try {
        const response = await axios.get(
          `https://api.nytimes.com/svc/topstories/v2/${sectionId}.json?api-key=${apiKey}`
        );
        // Check if response is OK (status 200) before processing
        setArticles(response.data.results); // Set new articles in local state
      } catch (error) {
        setError(true); // Set error to true if the fetch fails
        console.error(`Error fetching the news articles:${sectionId}`, error);
      }
    };

    if (sectionId) {
      fetchArticles(); // Fetch articles when sectionId changes
    }
  }, [sectionId, apiKey]); // Dependency array includes sectionId
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      <div className=" w-full border-b border-black ">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-12 " src={logo} alt="Logo image" />
            </Link>
          </Navbar>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3">
        <h1 className="text-5xl py-3 border-b-2 border-black max-w-[1200px] mx-auto font-bold sm:text-[32px]">
          {error
            ? "Page Not Found"
            : capitalizeFirstLetter(sectionId) + ". News"}
        </h1>

        <main className="flex max-w-[1200px] mx-auto mt-5 lg:flex-col md:flex-col sm:flex-col  ">
          <div className="w-[70%] mr-5 lg:w-full md:w-full sm:w-full">
            {articles?.length != 0 &&
              articles?.slice(1, 2).map((article, index) => (
                <div className="text-center	" key={index}>
                  <a href={article.url}>
                    <div>
                      {article.multimedia && article.multimedia.length > 0 ? (
                        <img
                          className=" max-h-[584px] w-full "
                          src={article.multimedia[0].url}
                          alt={article.multimedia[0].caption || "Article Image"}
                        />
                      ) : (
                        // if api doesn't have image, use this
                        <img
                          className="max-h-[584px] w-full "
                          src={noImage}
                          alt={
                            article?.multimedia?.[1]?.caption || "Article Image"
                          }
                        />
                      )}
                      <h2 className="text-3xl hover:text-gray-600">
                        {article?.title || "data not found"}
                      </h2>
                      <p>{article?.abstract || "data not found"}</p>
                    </div>
                  </a>
                </div>
              ))}
          </div>

          <div className="w-[30%] pl-5 border-l border-black lg:w-full lg:grid lg:grid-cols-3 md:w-full md:border-l-0 md:pl-0 md:border-t md:pt-3 sm:w-full sm:border-t sm:pt-3 sm:border-l-0 sm:pl-0 lg:gap-3 lg:border-l-0 lg:pl-0 lg:border-t lg:pt-3">
            {articles?.length != 0 &&
              articles?.slice(2, 5).map((article, index) => (
                <div key={index} className=" ">
                  <a href={article.url}>
                    <div
                      className={`flex md:flex-col sm:flex-col  ${
                        index != 0 &&
                        "border-t border-black pt-3 lg:border-0 lg:pt-0"
                      }`}
                    >
                      <h3 className="text-2xl text-left leading-6	pb-2 font-semibold hover:text-gray-600">
                        {article.title}
                      </h3>
                      {article.multimedia && article.multimedia.length > 0 && (
                        <img
                          className="max-w-[75px] max-h-[75px] md:max-w-full md:max-h-[400px] sm:max-w-full sm:max-h-[400px]"
                          src={article.multimedia[0].url}
                          alt={article.multimedia[0].caption || "Article Image"}
                        />
                      )}
                    </div>
                  </a>

                  <p className="text-left pb-3  ">{article.abstract}</p>
                </div>
              ))}
          </div>
        </main>

        <section className=" pb-3 grid grid-cols-4 gap-4 py-3 mt-3 border-t lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 border-black">
          {articles?.length != 0 &&
            articles?.slice(5, 13).map((article, index) => (
              <div key={index}>
                <a href={article.url}>
                  <div>
                    {article.multimedia && article.multimedia.length > 0 ? (
                      <img
                        className="w-full max-h-[200px] sm:max-h-[300px]"
                        src={article.multimedia[1].url}
                        alt={article.multimedia[1].caption || "Article Image"}
                      />
                    ) : (
                      // if api doesn't have image, use this
                      <img
                        className="w-full max-h-[181px] sm:max-h-[300px]"
                        src={noImage}
                        alt={
                          article?.multimedia?.[2]?.caption || "Article Image"
                        }
                      />
                    )}
                    <h3 className="text-2xl text-left leading-6	pb-2 hover:text-gray-600">
                      {article.title}
                    </h3>
                  </div>
                </a>
              </div>
            ))}
        </section>

        <section className="w-[70%] md:w-full sm:w-full ">
          <h2 className="pt-3 font-bold  border-black">Latest</h2>
          <div className=" ">
            {articles?.length != 0 &&
              articles?.slice(13, 23).map((article, index) => (
                <div
                  className=" py-3  clearfix sm:flex sm:flex-col "
                  key={index}
                >
                  <div className="sm:order-last">
                    <span className="flex sm:w-full pt-3 w-[20%] border-t border-black sm:border-t-0 float-left">
                      {formattedDate(article.published_date)}
                    </span>
                  </div>

                  <div className="w-[80%] text-left py-3  sm:w-full border-t border-black pl-2 float-left">
                    <a href={article.url}>
                      {article.multimedia && article.multimedia.length > 0 ? (
                        <img
                          className="max-h-40 sm:max-h-28 float-right right-0 ml-2 mb-2"
                          src={
                            article.multimedia?.[1]?.url
                              ? article.multimedia[1].url
                              : noImage
                          }
                          alt={
                            article?.multimedia?.[1]?.caption || "Article Image"
                          }
                        />
                      ) : (
                        // if api doesn't have image, use this
                        <img
                          className="max-h-40 sm:max-h-28 float-right right-0 ml-2 mb-2"
                          src={noImage}
                          alt={
                            article?.multimedia?.[2]?.caption || "Article Image"
                          }
                        />
                      )}
                      <h2 className="text-2xl pb-2 sm:text-xl hover:text-gray-600">
                        {article.title}
                      </h2>
                   </a>
                    <p className="text-sm pr-4">{article.abstract}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <div className="clear-both"></div>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Section;
