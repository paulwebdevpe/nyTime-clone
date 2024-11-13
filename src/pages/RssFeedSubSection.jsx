import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import xml2js from "xml2js"; // Import XML to JSON converter
import noImage from "../images/no-image.webp";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../images/logo.webp";
import formattedDate from "../utils/formattedDate";

function RssFeedSubSection() {
  const { sectionId, subSectionId } = useParams(); // Extract sectionId and subSectionID from URL parameters
  const [side, setSide] = useState();

  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        // Fetch Side Articles (RSS Feed)
        const response = await axios.get(
          `https://rss.nytimes.com/services/xml/rss/nyt/${subSectionId}.xml`
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
        const responseSideArticles = parsedData?.rss?.channel?.item || [];

        setSide(responseSideArticles); // Set parsed RSS data in Redux
        setError(false); // No error, so reset error to false
      } catch (error) {
        /*setError("Error fetching the news articles. Please try again later.");
         */ console.error(
          `Error fetching the news articles: ${subSectionId}`,
          error
        );
        setError(true); // Set error to true if the fetch fails
      }
    };
    fetchArticles();
  }, [subSectionId]);

  return (
    <>
      <div className=" w-full border-b border-black ">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 w ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-12 " src={logo} alt="Logo image" />{" "}
            </Link>
          </Navbar>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
        <div className="pb-5 border-b border-black">
          <h2 className="font-bold"> {sectionId}</h2>
          <h1 className="font-bold text-5xl sm:text-[32px]">
            {error ? "Page Not Found" : subSectionId}
          </h1>
        </div>

        <main className="flex py-5 border-b border-black lg:flex-col md:flex-col sm:flex-col">
          <div className="flex w-[80%] lg:w-full md:w-full sm:w-full sm:flex sm:flex-col">
            {side?.length !== 0 &&
              side?.slice(0, 2).map((article, index) => (
                <div
                  className={
                    index === 0
                      ? "w-[65%] pr-3 border-r border-black sm:w-full sm:border-r-0 sm:pr-0  "
                      : "w-[35%] pr-3 pl-3 sm:w-full sm:border-r-0 sm:px-0 "
                  }
                  key={index}
                >
                  <div>
                    <a href={article.link} target="_blank">
                      {article["media:content"] ? (
                        <img
                          className=" w-full   max-h-[540px] "
                          src={article["media:content"]?.$?.url}
                          alt={article.description || "Article Image"}
                        />
                      ) : (
                        <img
                          className="w-full max-h-[420px] "
                          src={noImage}
                          alt={article.description || "Article Image"}
                        />
                      )}
                    </a>
                  </div>

                  <div>
                    <a href={article.link} target="_blank">
                      <h2 className="py-2 text-2xl hover:text-gray-600">
                        {article.title}
                      </h2>
                    </a>
                    <p className="text-sm pb-3">{article.description}</p>
                  </div>
                </div>
              ))}
          </div>

          <div className="w-[20%] pl-3  lg:grid lg:grid-cols-2 md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 lg:w-full md:w-full sm:w-full  lg:pt-3 lg:border-l-0 lg:pl-0 md:pt-3 md:border-l-0 md:pl-0 sm:pt-3 sm:border-l-0 sm:pl-0 gap-3 border-l border-black">
            {side?.length !== 0 &&
              side?.slice(2, 4).map((article, index) => (
                <div key={index}>
                  <a href={article.link} target="_blank">
                    <div>
                      {article["media:content"] ? (
                        <img
                          className=" w-full  max-h-56 sm:max-h-80"
                          src={article["media:content"]?.$?.url}
                          alt={article.description || "Article Image"}
                        />
                      ) : (
                        <img
                          className="w-full max-h-56 sm:max-h-80"
                          src={noImage}
                          alt={article.description || "Article Image"}
                        />
                      )}
                    </div>
                  </a>
                  <div>
                    <a href={article.link} target="_blank">
                      <h2 className="text-2xl pb-3 hover:text-gray-600">
                        {article.title}
                      </h2>
                    </a>
                    <p className="text-sm pb-3">{article.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </main>

        <section>
          <div className="grid pt-5 grid-cols-5 lg:grid lg:grid-cols-3 md:grid md:grid-cols-2 sm:grid sm:grid-cols-1 gap-3 ">
            {side?.length !== 0 &&
              side?.slice(4, 9).map((article, index) => (
                <div className=" " key={index}>
                  <a href={article.link} target="_blank">
                    <div>
                      {article["media:content"] ? (
                        <img
                          className=" w-full max-h-56 sm:max-h-80"
                          src={article["media:content"]?.$?.url}
                          alt={article.description || "Article Image"}
                        />
                      ) : (
                        // if api doesn't have image, use this
                        <img
                          className="w-full max-h-56 sm:max-h-80"
                          src={noImage}
                          alt={article.description || "Article Image"}
                        />
                      )}
                    </div>
                  </a>
                  <div>
                    <a href={article.link} target="_blank">
                      <h2 className="text-2xl pb-3 hover:text-gray-600">
                        {article.title}
                      </h2>
                    </a>
                    <p className="text-sm pb-3">{article.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>

        <section className="w-[70%] md:w-full sm:w-full ">
          <h2 className="pt-3 font-bold  border-black">Latest</h2>
          <div className=" ">
            {side?.length != 0 &&
              side?.slice(12, 22).map((article, index) => (
                <div
                  className=" py-3  clearfixm sm:flex sm:flex-col "
                  key={index}
                >
                  <div className="sm:order-last">
                    <span className="flex sm:w-full pt-3 w-[20%] border-t border-black sm:border-t-0 float-left">
                      {formattedDate(article.pubDate)}
                    </span>
                  </div>

                  <div className="w-[80%] text-left py-3  sm:w-full border-t border-black  float-left">
                    <a href={article.link} target="_blank">
                      {article["media:content"] ? (
                        <img
                          className="max-h-40 sm:max-h-28 float-right right-0  ml-2 mb-2"
                          src={article["media:content"]?.$?.url}
                          alt={article.description || "Article Image"}
                        />
                      ) : (
                        // if api doesn't have image, use this
                        <img
                          className="max-h-40 sm:max-h-28 float-right right-0  ml-2 mb-2"
                          src={noImage}
                          alt={article.description || "Article Image"}
                        />
                      )}
                      <h2 className="text-2xl pb-2 sm:text-xl pr-4 hover:text-gray-600">
                        {article.title}
                      </h2>
                    </a>
                    <p className="text-sm pr-4">{article.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </section>
        <div className="clear-both"></div>

        <Footer></Footer>
      </div>
    </>
  );
}

export default RssFeedSubSection;
