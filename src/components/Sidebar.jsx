import React from "react";
import Carousel from "./Carousel";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const sideArticles = useSelector((state) => state.navigation.sideArticles);

  return (
    <aside className="border-l border-black lg:border-l-0 md:border-l-0 sm:border-l-0 mb-5 ">
      <div className="pt-3 ml-3 md:ml-0 sm:ml-0 lg:mx-0 border-t border-black ">
        {sideArticles?.slice(0, 1).map((article, index) => (
          <div key={index}>
            <a href={article.link} target="_blank">
              <div>
                {article["media:content"] && (
                  <img
                    width="330"
                    height="250"
                    loading="lazy"
                    className="w-full max-h-[250px] lg:max-h-[500px]  "
                    src={article["media:content"]?.$.url}
                    alt={article.description || "Article Image"}
                  />
                )}
              </div>
            </a>

            <div>
              <a href={article.link} target="_blank">
                <h2 className="text-2xl py-3 hover:text-gray-600">
                  {article.title}
                </h2>
                <p className="text-sm pb-3">{article.description}</p>
              </a>
            </div>
            <div className=" pt-4 border-t pb-3 border-b border-black">
              <div className="w-[100%] h-[100%] ">
                <Carousel article={article}></Carousel>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/*       OPINION SECTION   */}
      <div className="ml-3 md:ml-0 sm:ml-0 lg:ml-0 md:px-0 mb-2">
        <h2 className="py-3 font-bold">Opinion</h2>
        <div className=" lg:grid lg:grid-cols-2 ">
          {sideArticles.slice(5, 15).map((article, index) => (
            <div
              className="flex lg:flex  lg:border-r  lg:even:border-r-0 lg:odd:pr-2 lg:even:pl-2 border-black"
              key={index}
            >
              <div
                //if img is true take 70 % width else take 100%
                className={`border-b border-black  ${
                  article["media:content"] && article["media:content"].$.url
                    ? "py-4 pr-2 lg:pr-6 w-[70%] leading-none "
                    : "py-4 w-[100%] leading-none "
                }`}
              >
                {article["dc:creator"] && (
                  <span className="block pb-2">{article["dc:creator"]}</span>
                )}
                <a href={article.link} target="_blank">
                  <h3 className="text-[20px] leading-none hover:text-gray-600 ">
                    {article.title}
                  </h3>
                </a>
              </div>

              <div
                className={
                  article["media:content"] && article["media:content"].$.url
                    ? " w-[30%] border-b border-black"
                    : " w-[0%] "
                }
              >
                {article["media:content"] && (
                  <img
                    width="100"
                    height="150"
                    loading="lazy"
                    className="h-full w-full py-4 object-cover"
                    src={article["media:content"]?.$.url}
                    alt={article.description || "Article Image"}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <a href="https://www.nytimes.com/" target="_blank">
        <span className="block font-semibold pl-3 hover:underline">
          Read more on NYTimes.com
        </span>
      </a>
    </aside>
  );
};

export default Sidebar;
