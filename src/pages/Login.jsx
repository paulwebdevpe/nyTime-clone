import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import { auth, googleProvider } from "../firebase/setup";
import logo from "../images/newyork.webp";
import { FaGoogle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const createNewUser = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("created account successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);

      switch (err.code) {
        case "auth/email-already-in-use":
          toast.error("Email already in use");
          break;
        case "auth/weak-password":
          toast.error("Password should be at least 6 characters");
          break;
        default:
          toast.error("Something went wrong");
      }
    }
  };
  const emailLogIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged In successfully!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
      switch (err.code) {
        case "auth/invalid-email":
          toast.error("Invalid email");
          break;
        case "auth/wrong-password":
          toast.error("Wrong password");
          break;
        default:
          toast.error("Something went wrong");
      }
    }
  };
  const googleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in successfully");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (err) {
      console.error(err);
      toast.error(err);
    }
  };

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="max-w-md w-full p-6 bg-white shadow-md rounded-lg">
          <div className="text-center mb-6">
            <Link to="/">
              <img className="mx-auto w-52" src={logo} alt="logo" />{" "}
            </Link>
          </div>
          <h1 className="text-gray-700 font-bold text-2xl text-center mb-6">
            Log in or create an account
          </h1>
          <form>
            <div className="mb-4">
              <label className="block font-bold text-base mb-1">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="w-full p-2 border border-gray-300 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6 ">
              <label className="block font-bold text-base mb-1">Password</label>
              <input
                type="password"
                className="w-full p-2 border border-gray-300 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="  grid grid-cols-2 gap-3">
              <button
                onClick={emailLogIn}
                type="submit"
                className="bg-black text-white  p-2 mb-4 font-semibold rounded"
              >
                Log In
              </button>
              <button
                onClick={createNewUser}
                type="submit"
                className="bg-black text-white  p-2 mb-4 font-semibold rounded"
              >
                Create Account
              </button>
            </div>
          </form>

          <button
            onClick={googleLogin}
            className="border border-gray-300 w-full p-2 flex items-center justify-center cursor-pointer rounded"
            type="button"
          >
            <div className="pr-3">
              <FaGoogle />
            </div>
            <h1 className="font-bold">Continue with Google</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default Login;
