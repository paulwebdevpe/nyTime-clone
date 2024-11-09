import { React, useState } from "react";
import logo from "../images/newyork.png";
import arrow from "../images/arrowDown.svg";
import { Link, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { auth } from "../firebase/setup";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { signOut } from "firebase/auth";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdCancel } from "react-icons/md";

function Navbar({
  logoRef,
  onMenuToggle,
  hideLogoAndDate = false,
  hideLinks = false,
  hideSearchAndLogin = false,
  children,
}) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to control menu visibility
  const [openAccountMenu, setOpenAccountMenu] = useState(false);

  function CurrentDate() {
    // Get the current date
    const today = new Date();

    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = today.toLocaleDateString("en-US", options);

    return formattedDate;
  }

  const logout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged Out successfully");
      setOpenAccountMenu(!openAccountMenu);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMenuToggle = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    if (onMenuToggle) {
      onMenuToggle(newMenuState); // Pass state change to parent
    }
  };
  return (
    <>
      <header className="pt-2">
        {!hideSearchAndLogin && (
          <div className="flex justify-between	relative ">
            <div className="">
              {/* ICONS  */}
              <div className="lg:hidden md:hidden sm:hidden">
                <SearchInput showImg={true}></SearchInput>
              </div>
              <div className="">
                <button
                  onClick={handleMenuToggle}
                  className="hidden lg:block md:block sm:block"
                  type="button"
                >
                  <GiHamburgerMenu className="text-2xl" />
                </button>
              </div>
            </div>

            {children}
            {/* LOGIN */}
            {auth?.currentUser || auth?.currentUser?.email ? (
              <button
                className=" p-2 bg-blue-500 text-xs text-white rounded-lg"
                onClick={() => setOpenAccountMenu(!openAccountMenu)}
              >
                ACCOUNT
              </button>
            ) : (
              <Link
                to="/login"
                className="p-2 bg-blue-500 text-xs text-white  flex items-center justify-center rounded-lg"
              >
                LOG IN
              </Link>
            )}
            {/* MENU ACCOUNT  */}
            {openAccountMenu && (
              <div className=" bg-slate-800 absolute z-40 right-0 sm:w-full text-white">
                <ul className="   w-[350px] sm:w-full  max-h-full p-4">
                  <li className="border-b-2 py-3 border-white flex justify-between items-center">
                    <span>{auth.currentUser.email}</span>
                    <button
                      onClick={() => setOpenAccountMenu(!openAccountMenu)}
                      type="button"
                    >
                      <MdCancel className="text-2xl   ml-auto" />
                    </button>
                  </li>
                  <li className="border-b-2 py-3 border-white">
                    <Link to="/profile">Account Settings</Link>
                  </li>

                  <li className="border-b-2 py-3 border-white">
                    <button onClick={logout} type="button">
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </header>
      <nav ref={logoRef} className="pt-1 ">
        {!hideLogoAndDate && (
          <div className="flex relative lg:flex lg:flex-col md:flex  md:flex-col sm:flex sm:flex-col">
            {/* LOGO */}
            <div className="mx-auto sm:px-3 md:px-3 lg:px-3 ">
              <Link to="/" onClick={window.location.reload}>
                <img
                  className="max-h-[65px]  lg:pb-3 md:pb-3 sm:pb-3 "
                  src={logo}
                  alt="search logo"
                />
              </Link>
            </div>
            {/* DATE */}
            <span
              className="absolute top-1/3 
          lg:static lg:block lg:text-center lg:py-2 lg:border-y border-t-black
          md:static	md:block md:text-center md:py-2 md:border-y 
          sm:static	sm:block sm:text-center sm:py-2 sm:border-y "
            >
              {CurrentDate()}
            </span>
          </div>
        )}

        {!hideLinks && (
          <div className=" mx-auto mb-6 border-b border-black lg:hidden md:hidden sm:hidden ">
            <ul className="flex justify-center ">
              <li className=" flex py-4 px-3 hover:underline hover:underline-offset-4 leading-none decoration-thick">
                <Link to="/us">U.S. </Link>
                <img
                  className="w-[15px] ml-1"
                  src={arrow}
                  alt="arrow down svg"
                />
              </li>
              <li className=" flex py-4 px-3 hover:underline hover:underline-offset-4 leading-none decoration-thick">
                <Link to="/world"> World</Link>
                <img
                  className="w-[15px] ml-1"
                  src={arrow}
                  alt="arrow down svg"
                />
              </li>
              <li className="flex py-4 px-3 hover:underline hover:underline-offset-4 leading-none decoration-thick">
                <Link to="/business">Buisness</Link>
                <img
                  className="w-[15px] ml-1"
                  src={arrow}
                  alt="arrow down svg"
                />
              </li>
              <li className="flex py-4 px-3 hover:underline hover:underline-offset-4 leading-none decoration-thick">
                <Link to="/arts">Arts</Link>
                <img
                  className="w-[15px] ml-1"
                  src={arrow}
                  alt="arrow down svg"
                />
              </li>
              <li className="flex py-4 px-3 hover:underline hover:underline-offset-4 leading-none decoration-thick">
                <Link to="/politics"> Politics</Link>
                <img
                  className="w-[15px] ml-1"
                  src={arrow}
                  alt="arrow down svg"
                />
              </li>
              <li className="flex py-4 px-3 hover:underline hover:underline-offset-4 leading-none decoration-thick">
                <Link to="/Opinion"> Opinion</Link>
                <img
                  className="w-[15px] ml-1"
                  src={arrow}
                  alt="arrow down svg"
                />
              </li>
            </ul>
          </div>
        )}

        {/* Mobile Menu */}
        <div
          className={`hidden  ${
            isMenuOpen
              ? "lg:block md:block sm:block"
              : "lg:hidden md:hidden sm:hidden"
          } lg:absolute lg:top-0 lg:left-0 lg:right-0 lg:bg-white lg:p-4
          md:absolute md:top-0 md:left-0 md:right-0 md:bg-white md:p-4
          sm:absolute sm:top-0 sm:left-0 sm:right-0 sm:bg-white sm:p-4`}
        >
          <ul className="space-y-2 ">
            <button onClick={handleMenuToggle}>
              <MdCancel className="text-2xl " />
            </button>
            <div className="">
              <SearchInput
                className="sm:w-full"
                showImg={false}
                showInputMenu={true}
              ></SearchInput>
            </div>

            <li>
              <Link
                to="/us"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                U.S.
              </Link>
            </li>
            <li>
              <Link
                to="/world"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                World
              </Link>
            </li>
            <li>
              <Link
                to="/technology"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Technology
              </Link>
            </li>
            <li>
              <Link
                to="/sports"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Sports
              </Link>
            </li>
            <li>
              <Link
                to="/business"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Business
              </Link>
            </li>
            <li>
              <Link
                to="/movies"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Movies
              </Link>
            </li>
            <li>
              <Link
                to="/opinion"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Opinion
              </Link>
            </li>
            <li>
              <Link
                to="/politics"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Politics
              </Link>
            </li>

            <li>
              <Link
                to="/fashion"
                className="block py-6 px-4 hover:bg-gray-200 border-b border-black"
                onClick={() => setIsMenuOpen(false)}
              >
                Fashion
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
