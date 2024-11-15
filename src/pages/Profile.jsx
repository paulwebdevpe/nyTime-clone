import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import logo from "../images/logo.webp";
import { auth, db } from "../firebase/setup";
import { doc, getDoc } from "firebase/firestore";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  updateNameProfile,
  deleteArticle,
  deleteUserAccount,
} from "../utils/firebaseActions";

const Profile = () => {
  const navigate = useNavigate();

  const [nameInput, setNameInput] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [dataArticles, setDataArticles] = useState([]);
  const [showArticles, setShowArticles] = useState(false);
  const [deleteUserMessage, setDeleteUserMessage] = useState(false);
  const [isLoading, setLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          // Fetch user data from Firestore
          const userDocRef = doc(db, "Users", user.uid); // Reference to the user's document in Firestore
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
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // loading screen
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-t-4 border-gray-200 rounded-full animate-spin border-t-gray-600"></div>
      </div>
    );

  return (
    <div>
      <div className=" w-full border-b border-black ">
        <div className=" max-w-[1200px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3 ">
          <Navbar hideLogoAndDate={true} hideLinks={true}>
            <Link to="/">
              <img
                className="max-h-12  px-2 "
                width="220"
                src={logo}
                alt="Logo image"
              />
            </Link>
          </Navbar>
        </div>
      </div>
      <div>
        {/* Profile section */}
        {auth.currentUser ? (
          <div className="max-w-[600px] mx-auto w-full px-8 lg:px-4 md:px-3 sm:px-3">
            <div className="py-5 border-b-2 border-black sm:text-center">
              <h1 className=" text-3xl pt-8 font-bold sm:py-4">
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
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="border border-black mt-2 pl-2 mr-2 sm:w-full sm:max-w-40"
                        placeholder="Enter new Name"
                      ></input>
                      <input
                        type="text"
                        value={surname || ""}
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
                  >
                    Update
                  </button>
                  {nameInput && (
                    <button
                      onClick={() =>
                        updateNameProfile(name, surname, setNameInput)
                      }
                      className="bg-gray-800 w-32 rounded-lg h-10 text-white hover:bg-gray-700"
                      type="submit"
                    >
                      Change Name
                    </button>
                  )}
                </div>
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
                      onClick={() => deleteUserAccount(navigate)}
                      className="bg-gray-800 w-32 rounded-lg h-10 text-white hover:bg-gray-700"
                      type="button"
                      aria-label="click to confirm account deletion"
                    >
                      Yes
                    </button>
                  )}
                </div>
                <div className="flex flex-col">
                  <button
                    onClick={() => setDeleteUserMessage(!deleteUserMessage)}
                    className="bg-gray-800 w-32 mb-3 rounded-lg h-10 text-white hover:bg-gray-700"
                    type="button"
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
