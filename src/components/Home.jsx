import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = ({ artStart, artEnd, imgArt }) => {
  const articles = useSelector((state) => state.navigation.articles);

  return (
    <main className="flex  mb-3 border-t  border-black pt-3 mr-3 lg:mr-0 md:flex md:flex-col md:mr-0 sm:mr-0 sm:flex sm:flex-col  ">
      <ul className="w-[40%] md:w-full sm:w-full sm:order-last md:order-last">
        {articles?.slice(artStart, artEnd).map((article, index) => (
          <li className="flex " key={index}>
            <a href={article.url} target="_blank">
              <div>
                <h2 className="text-lg font-semibold md:w-full hover:text-gray-600 sm:text-[20px]">
                  {article.title}
                </h2>
                <p
                  className={
                    index === articles.slice(artStart, artEnd).length - 1
                      ? "border-b-0 text-sm py-2 text-[16px]"
                      : "text-sm py-2 border-b-2 text-[16px] border-gray-300"
                  }
                >
                  {article.abstract}
                  <span className="block font-semibold">Read more on NYTimes.com</span>
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
      <div className="w-[60%]  pl-3 md:w-full   md:pl-0 sm:w-full sm:pl-0">
        {articles?.map((article, index) => (
          <div className="" key={index}>
            {index == imgArt &&
              article.multimedia &&
              article.multimedia.length > 0 && (
               <a href={article.url} target="_blank">
                  <img
                    width="460"
                    height="310"
                    loading="lazy"
                    className="h-full w-full  object-cover"
                    src={article.multimedia[1].url}
                    alt={article.multimedia[1].caption || "Article Image"}
                  />
                </a>
              )}
          </div>
        ))}
      </div>
    </main>
  );
};

export default Home;
