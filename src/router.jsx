import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Article from "./pages/Article";
import Login from "./pages/Login";
import PageNotFound from "./components/PageNotFound";
import Section from "./pages/Section";
import Search from "./pages/SearchPage";
import RssFeedSubSection from "./pages/RssFeedSubSection";
import Profile from "./pages/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <PageNotFound />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: ":sectionId",
        children: [  {
          index: true,
          element: <Section />,
        },
          {

            path: "subSection/:subSectionId",
            element: <RssFeedSubSection />,
          },
        ],
      },
      { path: "article", element: <Article /> },
      { path: "login", element: <Login /> },
      { path: "search", element: <Search /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);
