import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function NewsFooter() {
  const arts = useSelector((state) => state.newsFooter.arts);
  const well = useSelector((state) => state.newsFooter.well);

  return (
    <section className=" pt-3 border-t border-black">
      <div className="block font-bold max-w-[1200px] ">Arts</div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-5 ">
        {arts.slice(0, 24).map(
          (art, index) =>
            // Only render the image and titles every 3 articles
            index % 3 === 0 && (
              <div
                key={index}
                className="  max-h-[360px] mb-3 basis-1/5 w-full"
              >
                {/* Render the image */}
                <div>
                  <Link to="/Article" state={{ data: art }}>
                    <img
                      src={art?.multimedia[1]?.url}
                      alt={art?.multimedia[1]?.caption || "Image"}
                      className="w-full h-full object-cover basis-1/5 max-h-[145px] sm:max-h-[250px]"
                    />
                  </Link>
                </div>

                {/* Render 3 article titles below the image */}
                {arts.slice(index, index + 3).map((article, index) => (
                  <Link to="/Article" key={index} state={{ data: article }}>
                    <h4 className="text-sm py-1 hover:text-gray-600">
                      {article?.title}
                    </h4>
                  </Link>
                ))}
              </div>
            )
        )}
      </div>

      <div className="block font-bold border-t border-black pt-3">Well</div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-cols-5 ">
        {well.slice(0, 24).map(
          (art, index) =>
            // Only render the image and titles every 3 articles
            index % 3 === 0 && (
              <div key={index} className="  max-h-[360px] mb-3  w-full">
                {/* Render the image */}
                <div>
                  <Link to="/Article" state={{ data: art }}>
                    <img
                      src={art?.multimedia[1]?.url}
                      alt={art?.multimedia[1]?.caption || "Image"}
                      className="w-full h-full object-cover max-h-[145px] sm:max-h-[250px]"
                    />
                  </Link>
                </div>

                {/* Render 3 article titles below the image */}
                {well.slice(index, index + 3).map((article, index) => (
                  <Link to="/Article" key={index} state={{ data: article }}>
                    <h4 className="text-sm py-1 hover:text-gray-600">
                      {article?.title}
                    </h4>
                  </Link>
                ))}
              </div>
            )
        )}
      </div>
    </section>
  );
}

export default NewsFooter;
