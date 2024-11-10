import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/newyork.png";
import { auth, db } from "../firebase/setup";
import { toast } from "react-toastify";
import {
  setDoc,
  doc,
  getDoc,
  arrayRemove,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { deleteUser } from "firebase/auth";
import { MdCancel } from "react-icons/md";

const Profile = () => {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dataArticles, setDataArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(false);
  const [deleteUserMessage, setDeleteUserMessage] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // Function to update name and surname
  async function updateNameProfile(name, surname) {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;

      try {
        // Save name and surname in Firestore for the authenticated user
        await setDoc(
          doc(db, "Users", uid),
          {
            name: name,
            surname: surname,
          },
          { merge: true }
        );
        toast.success("Profile updated successfully!");

        console.log("User profile saved in Firestore");
        setNameInput(false);
      } catch (error) {
        console.error("Error saving profile:", error);
      }
    } else {
      console.log("No user is signed in");
    }
  }

  // Function to delete an article
  async function deleteArticle(articleToDelete) {
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const articleRef = doc(db, "Users", uid); // Reference to the user's document in Firestore

      try {
        // Remove the article based on its unique identifier (e.g., title)
        await updateDoc(articleRef, {
          savedArticles: arrayRemove(articleToDelete),
        });
        console.log("Article deleted successfully!");
        // Update the local state to remove the deleted article
        setDataArticles((prevArticles) =>
          prevArticles.filter(
            (article) => article.title !== articleToDelete.title
          )
        );
      } catch (error) {
        console.error("Error deleting article: ", error);
      }
    } else {
      console.log("No user is signed in");
    }
  }

  // Function to delete user data
  async function deleteUserData(uid) {
    try {
      await deleteDoc(doc(db, "Users", uid));
      console.log("User data deleted successfully from Firestore!");
    } catch (error) {
      console.error("Error deleting user data:", error);
    }
  }

  // Function to delete user account
  const deleteUserAccount = async () => {
    if (auth.currentUser) {
      try {
        // Delete user data from Firestore
        await deleteUserData(auth.currentUser.uid);

        // Delete the user from Firebase Authentication
        await deleteUser(auth.currentUser);

        console.log("User account and data deleted successfully!");
        toast.success("User account deleted successfully!");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error("Error deleting user or user data:", error);

        if (error.code === "auth/requires-recent-login") {
          alert("Please log in again to delete your account.");
        }
      }
    } else {
      console.log("No user is signed in.");
    }
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const uid = auth.currentUser.uid;
      if (auth.currentUser) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "Users", uid); // Reference to the user's document in Firestore
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            // Get name and surname from Firestore document
            const userData = userDocSnap.data();
            setName(userData.name);
            setSurname(userData.surname);
            setDataArticles(userData.savedArticles);
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        } finally {
          setLoading(false); // Stop showing the spinner
        }
      } else {
        console.log("No user is logged in.");
      }
    };
    fetchUserData();
  }, [auth.currentUser]);
  
  // loading screen
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-gray-600"></div>
      </div>
    );

  return (
    <div>
      <div className=" w-full border-b border-black pb-2">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img className="max-h-8  px-2 " src={logo} alt="Logo image" />
            </Link>
          </Navbar>
        </div>
      </div>
      <div>
        {/* Profile section */}
        {auth.currentUser ? (
          <div className="max-w-[600px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3">
            <div className="py-5 border-b-2 border-black">
              <h1 className=" text-3xl pt-8 font-bold sm:text-center sm:py-4">
                Good afternoon, {name ? name + "." : ""}
              </h1>
              <p>You've supported independent journalism since 2024.</p>
            </div>

            <h2 className="text-2xl font-semibold pt-3">Accoun Information</h2>
            <ul className="py-5 ">
              <li className="py-5 border-t border-black flex justify-between">
                <div>
                  <span>Email Address</span>
                  <p className="text-gray-800 ">{auth.currentUser.email}</p>
                </div>
              </li>
              <li className="py-5 border-t border-black flex justify-between">
                <div>
                  <span>Password</span>
                  <p className="text-gray-800"> ********</p>
                </div>
              </li>
              {/* UPDATE NAME */}
              <li className="py-5 border-t border-black flex justify-between ">
                <div className=" pr-2">
                  <span>Name</span>
                  <p className="text-gray-800">
                    {name && surname ? `${name} ${surname}` : "no name added"}
                  </p>
                  {nameInput && (
                    <div className="w-auto mr-2">
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-black mt-2 pl-2 mr-2 sm:w-full sm:max-w-40"
                        placeholder="Enter new Name"
                      ></input>
                      <input
                        type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required
                        className="border border-black mt-2 pl-2 sm:w-full sm:max-w-40"
                        placeholder="Enter new Surname"
                      ></input>
                    </div>
                  )}
                </div>
                <div className="  flex flex-col ">
                  <button
                    onClick={() => setNameInput(!nameInput)}
                    className="bg-gray-800 w-32 mb-3 rounded-lg h-10 text-white hover:bg-gray-700"
                    alt="click to update name"
                  >
                    Update
                  </button>
                  {nameInput && (
                    <button
                      onClick={() => updateNameProfile(name, surname)}
                      className="bg-gray-800 w-32 rounded-lg h-10 text-white hover:bg-gray-700"
                      type="submit"
                      alt="click to change name"
                    >
                      Change Name
                    </button>
                  )}
                </div>
              </li>
              {/*    SAVED ARTICLES */}
              <li className="py-5 border-t border-black  justify-between">
                <div className="flex justify-between">
                  <div className="pr-2">
                    <span>Saved Articles</span>
                    <p className="text-gray-800">
                      Save articles that you want to read later.
                    </p>
                  </div>
                  <div>
                    <button
                      onClick={() => setShowArticles(!showArticles)}
                      className="bg-gray-800 w-32 rounded-lg h-10 text-white hover:bg-gray-700"
                      alt="click to show articles "
                    >
                      View All
                    </button>
                  </div>
                </div>

                {showArticles && (
                  <ul>
                    {dataArticles && dataArticles.length > 0 ? (
                      dataArticles
                        .slice()
                        .reverse()
                        .map((article, index) => (
                          <li
                            key={index}
                            className="py-2 mt-2 border-t border-black flex justify-between"
                          >
                            <div className="flex items-center">
                              <button
                                onClick={() => deleteArticle(article)}
                                alt="delete article"
                              >
                                <MdCancel className="text-2xl hover:scale-150" />
                              </button>
                              <Link to="/article" state={{ data: article }}>
                                <div className="flex items-center">
                                  <p className="text-gray-800 w-3/4 ml-6 hover:underline">
                                    {article.title}
                                  </p>
                                  <img
                                    className="w-1/4"
                                    src={article.img}
                                    alt="image article"
                                  />
                                </div>
                              </Link>
                            </div>
                          </li>
                        ))
                    ) : (
                      <p className="text-gray-800 text-center py-4">
                        No articles saved.
                      </p>
                    )}
                  </ul>
                )}
              </li>
              {/*  DELETE ACCOUNT */}
              <li className="py-5 border-t border-black flex justify-between ">
                <div>
                  <span>Delete Account</span>
                  {deleteUserMessage && (
                    <p className="text-red-600 font-bold pb-3">
                      Are you sure you want to delete your account?
                    </p>
                  )}
                  {deleteUserMessage && (
                    <button
                      onClick={() => deleteUserAccount()}
                      className="bg-gray-800 w-32 rounded-lg h-10 text-white hover:bg-gray-700"
                      type="button" alt="click to confirm account deletion"
                    >
                      Yes
                    </button>
                  )}
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => setDeleteUserMessage(!deleteUserMessage)}
                    className="bg-gray-800 w-32 mb-3 rounded-lg h-10 text-white hover:bg-gray-700"
                    type="button" alt="click to delete account"
                  >
                    Delete
                  </button>
                </div>
              </li>
            </ul>
          </div>
        ) : (
          <div>
            <p className="text-center text-5xl pt-8 font-bold">
              Log in to see your profile.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
