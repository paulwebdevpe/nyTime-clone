import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import logo from "../images/newyork.png";
import { auth, db } from "../firebase/setup";
import { setDoc, doc, getDoc, arrayUnion } from "firebase/firestore";
import { CiBookmark } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import formattedDate from "../utils/formattedDate";
function Article() {
  const location = useLocation();
  const article = location.state?.data || {};
  console.log(article);
  
  const [saved, setSaved] = useState(false);

  const saveArticle = async (articles) => {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      try {
        // Save article in Firestore for the authenticated user
        await setDoc(
          doc(db, "Users", uid),
          {
            savedArticles: arrayUnion({
              title: articles.title || "",
              subTitle: articles.abstract || articles.description,
              img:
                articles?.multimedia?.[0]?.url ||
                articles["media:content"]?.$?.url ||
                "",
              caption: articles?.multimedia?.[1]?.caption || "",
              author: articles.byline || articles["dc:creator"] || "",
              pubDate: articles.published_date || articles.pubDate || "",
              copy:
                articles?.multimedia?.[1]?.copyright ||
                articles["media:credit"] ||
                "",
            }),
          },
          { merge: true },
          toast.success("Article saved!")
        );
        setSaved(true);
        console.log("User profile saved in Firestore");
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      console.log("No user is signed in");
      toast.error("No user is signed in");
    }
  };
  return (
    <section className="overflow-y-auto max-h-[100vh] ">
      <div className=" w-full border-b border-black ">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-8 px-2" src={logo} alt="Logo image" />
            </Link>
          </Navbar>
        </div>
      </div>

      <article className="  max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3">
        <div className="max-w-[600px] mx-auto ">
          {article.title && (
            <h1 className="text-4xl font-bold mb-3 pt-4">{article.title || article.headline.main}</h1>
          )}
          <p className="text-2xl">
            {article?.abstract || article?.description || article?.subTitle}
          </p>
        </div>

        <figure className="max-w-[1000px] mx-auto py-8 ">
          {(article?.multimedia?.[0]?.url ||
            article?.["media:content"] ||
            article?.img) && (
            <img
              className="w-full"
              src={
                article?.multimedia?.[0]?.url ||
                article["media:content"]?.$?.url ||
                article.img
              }
              alt={
                article?.multimedia?.[1]?.caption ||
                article.description ||
                "Article Image"
              }
            />
          )}
          <div className="flex justify-between">
            {(article.multimedia?.[1]?.caption ||
              article?.["media:credit"] ||
              article?.caption) && (
              <div className="flex ">
                <p className=" pt-3 text-base sm:text-sm w-full">
                  {article?.multimedia?.[1]?.caption ||
                    article?.caption ||
                    article?.["media:credit"]}
                  {/*  Add space before span */}
                  {article?.multimedia?.[1]?.copyright ||
                  article?.copy ||
                  article?.["media:credit"]
                    ? " "
                    : ""}
                  <span className="font-semibold">
                    {article?.multimedia?.[1]?.copyright ||
                      article?.copy }
                  </span>
                </p>
              </div>
            )}
            <button
              onClick={() => saveArticle(article)}
              className="text-3xl pt-3"
            >
              {saved ? <FaBookmark /> : <CiBookmark />}
            </button>
          </div>
        </figure>

        <div className="max-w-[600px] mx-auto pb-5">
          <p>{article.byline || article.author || article?.["dc:creator"]}</p>
          <span className="mb-5 block ">
            {formattedDate(article?.published_date || article?.pubDate)}
          </span>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            corporis quaerat a tenetur vitae ullam totam ad officiis optio
            ratione, laboriosam quibusdam sapiente. Eius atque tenetur tempore
            nihil recusandae hic, nulla dolor quia, autem sed similique maxime
            quaerat incidunt distinctio odit deleniti! Consequuntur, quidem
            eligendi, debitis magnam neque facere asperiores nostrum dicta nam
            eveniet quas, ad consectetur non ab. Molestias?
          </p>
        </div>
       
      </article> 
      <div className="max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3">
          <Footer></Footer>
        </div>
    </section>
  );
}

export default Article;
