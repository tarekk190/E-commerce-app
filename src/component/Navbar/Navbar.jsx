import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cartIcon } = useContext(CartContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleLogOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
  }

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-center md:justify-center md:mx-auto p-4">
        <Link className="flex items-center space-x-3 rtl:space-x-reverse md:mr-auto">
          <span>
            <i className="fa-solid fa-cart-shopping fa-2xl text-green-600"></i>
          </span>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Fresh Cart
          </span>
        </Link>

        <div className="flex justify-end items-end md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <ul className="flex">
            {userLogin == null ? (
              <>
                <Link to={"/register"}>
                  <li className="text-black cursor-pointer font-medium rounded-lg text-sm px-4 py-2 text-center hover:bg-slate-100">
                    Register
                  </li>
                </Link>
                <Link to={"/login"}>
                  <li className="text-black cursor-pointer font-medium rounded-lg text-sm px-4 py-2 text-center hover:bg-slate-100">
                    Login
                  </li>
                </Link>
              </>
            ) : (
              <>
                <Link to={"/cart"}>
                  <li className="text-black cursor-pointer relative font-medium rounded-lg text-sm px-4 py-2 text-center hover:bg-slate-100">
                    <i className="fa-solid fa-cart-shopping fa-2xl"></i>
                    <span className="bg-green-600 w-6 text-white p-1 absolute -top-2 right-[2px] rounded-full">
                      {cartIcon?.numOfCartItems}
                    </span>
                  </li>
                </Link>
                <Link
                  className="flex justify-center items-center"
                  onClick={handleLogOut}
                  to={"/login"}
                >
                  <li className="text-black cursor-pointer font-medium rounded-lg text-sm px-4 py-2 text-center hover:bg-slate-100">
                    Logout
                  </li>
                </Link>
              </>
            )}
          </ul>

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } items-center justify-between w-full md:flex md:w-auto md:order-1`}
        >
          <ul className="bg-slate-100 text-gray-500 flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 md:left-auto md:right-0 absolute top-full right-0 md:right-auto md:relative">
            {userLogin !== null && (
              <>
                <li>
                  <NavLink
                    to={"/"}
                    className="block py-2 px-3 text-gray-500 focus:text-green-600 hover:text-green-600 rounded-sm md:bg-transparent md:p-0 "
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/cart"}
                    className="block py-2 px-3 text-gray-500 rounded-sm focus:text-green-600 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/wishlist"}
                    className="block py-2 px-3 text-gray-500 rounded-sm focus:text-green-600 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    WishList
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/products"}
                    className="block py-2 px-3 text-gray-500 rounded-sm focus:text-green-600 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/categories"}
                    className="block py-2 px-3 text-gray-500 rounded-sm focus:text-green-600 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/brands"}
                    className="block py-2 px-3 text-gray-500 rounded-sm focus:text-green-600 hover:text-green-600 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-green-700 md:p-0 md:dark:hover:text-green-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    Brands
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
