import React from 'react'
import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { ownerLogout } from "../../reduxStore/slices/ownerSlice";
import { ownerLogout } from '../../Redux/slices/OwnerSlice';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentAlt } from "@fortawesome/free-regular-svg-icons";

const OwnerNavbar = () => {

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {owner} = useSelector((state) => state.ownerReducer)
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogout = () => {
    localStorage.removeItem("ownerToken")
    dispatch(ownerLogout())
    navigate("/owner/login")
  }
  return (
    <>
    <nav className="bg-blue-700 border-gray-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-4">
      <Link to='/owner' className="flex items-center">
      <h1 class="text-blue-50 text-3xl flex">roomque <p class="text-sm mt-5 ml-1">Owner</p></h1>
          
        </Link>
        <div className="flex gap-12 items-center md:order-2">
          <div>
          <Link to='/owner/chat'><FontAwesomeIcon icon={faCommentAlt} className="w-7 h-8 mt-1" size="lg" style={{color: "#ffff",}} /></Link>
          </div>
          <div className="relative" onClick={toggleDropdown}>
            <button
              type="button"
              className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              id="user-menu-button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full object-contain"
                src="/userLogo.png"
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}
            {isDropdownOpen &&
              (
                <div
                  className="absolute z-50 right-0 mt-4 text-base list-none bg-white divide-y divide-gray-500 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="user-dropdown"
                >
                  <div className="px-4 py-3">
                    <span className="block text-sm text-gray-900 dark:text-white">
                      {owner.name}
                    </span>
                    <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                      {owner.email}
                    </span>
                  </div>
                  <ul className="py-2" aria-labelledby="user-menu-button">
                    <li>
                      <Link
                        to='/owner/profile'
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                      >
                        Profile
                      </Link>
                      <Link
                        to='/owner/bookings'
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                      >
                        Bookings
                      </Link>
                    </li>
                    <li>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-500 dark:hover-bg-gray-600 dark:text-gray-200 dark:hover-text-white"
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </div>
               )}
          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover-bg-gray-100 focus:outline-none focus:ring-2 focus-ring-gray-200 dark:text-gray-400 dark:hover-bg-gray-700 dark:focus-ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded={isMobileMenuOpen}
            onClick={toggleMobileMenu}
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
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-blue-700">
            <li>
              <Link
                to="/owner"
                className={
                  location.pathname === "/owner"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-100 md:p-0 md:dark-text-blue-100"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/owner/dashboard"
                className={
                  location.pathname === "/owner/dashboard"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-100 md:p-0 md:dark-text-blue-100"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/owner/bookings"
                className={
                  location.pathname === "/owner/bookings"
                    ? "block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-100 md:p-0 md:dark-text-blue-100"
                    : "block py-2 pl-3 pr-4 text-gray-900 rounded hover-bg-gray-100 md:hover-bg-transparent md:hover-text-blue-700 md:p-0 dark-text-white md:dark-hover-text-blue-500 dark-hover-bg-gray-700 dark-hover-text-white md:dark-hover-bg-transparent dark-border-gray-700"
                }
              >
                My Bookings
              </Link>
            </li>
            

          </ul>
        </div>
      </div>
      {/* Mobile menu items */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <ul className="py-2 bg-gray-100 md:bg-transparent">
            <li>
              <Link
                to='/owner'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to='/owner/dashboard'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to='/owner/bookings'
                className="block px-4 py-2 text-gray-900 hover-bg-gray-100 md:hover-bg-transparent"
              >
                My Bookings
              </Link>
            </li>
           
            
            
          </ul>
        </div>
      )}
    </nav>
    </>
  )
}

export default OwnerNavbar