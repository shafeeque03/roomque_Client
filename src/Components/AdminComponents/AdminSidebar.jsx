import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar = () => {
    const location = useLocation();
    return (
        <>
            <div className="drawer flex justify-end  md:hidden z-10 bg-white">
                <input
                    id="my-drawer"
                    type="checkbox"
                    className="drawer-toggle w-10 h-10"
                />
                <div className="drawer-content flex justify-end pb-6">
                    <FontAwesomeIcon
                        className="w-8 h-8"
                        size="2xl"
                        icon={faBars}
                        style={{ color: "#3f85f8" }}
                    />
                </div>
                <div className="drawer-side">
                    <label
                        htmlFor="my-drawer"
                        aria-label="close sidebar"
                        className="drawer-overlay"
                    ></label>
                    <div className="p-4 w-80 min-h-full bg-gray-700 text-base-content">
                        <div className="p-4 w-full bg-gray-800">
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link
                                        to="/admin/dashboard"
                                        className={
                                            location.pathname === "/admin/dashboard"
                                                ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                : "flex items-center p-2 text-gray-900 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        }
                                    >
                                        <svg
                                            fill="none"
                                            viewBox="0 0 15 15"
                                            height="1.5em"
                                            width="1.5em"
                                        >
                                            <path
                                                fill="currentColor"
                                                fillRule="evenodd"
                                                d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 001.04 2.15C1 2.324 1 2.52 1 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 002.15 6.96C2.324 7 2.52 7 2.75 7H5.25c.229 0 .426 0 .6-.041A1.5 1.5 0 006.96 5.85C7 5.676 7 5.48 7 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 005.85 1.04C5.676 1 5.48 1 5.25 1H2.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 01-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 2.15C8 2.324 8 2.52 8 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 6.96C9.324 7 9.52 7 9.75 7H12.25c.229 0 .426 0 .6-.041A1.5 1.5 0 0013.96 5.85C14 5.676 14 5.48 14 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 1.04C12.676 1 12.48 1 12.25 1H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM2.75 8H5.25c.229 0 .426 0 .6.041A1.5 1.5 0 016.96 9.15C7 9.324 7 9.52 7 9.75V12.25c0 .229 0 .426-.041.6A1.5 1.5 0 015.85 13.96C5.676 14 5.48 14 5.25 14H2.75c-.229 0-.426 0-.6-.041A1.5 1.5 0 011.04 12.85C1 12.676 1 12.48 1 12.25V9.75c0-.229 0-.426.041-.6A1.5 1.5 0 012.15 8.04C2.324 8 2.52 8 2.75 8zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 00-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 00.37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 00.37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 00-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 9.15C8 9.324 8 9.52 8 9.75V12.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 13.96c.174.041.371.041.6.041H12.25c.229 0 .426 0 .6-.041a1.5 1.5 0 001.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 8.04C12.676 8 12.48 8 12.25 8H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 01-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        <span className="ml-3">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/userList"
                                        className={
                                            location.pathname === "/admin/userList"
                                                ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                : "flex items-center p-2 text-gray-900 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        }
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="1.5em"
                                            width="1.5em"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <circle cx="12" cy="7" r="4" />
                                            <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                                        </svg>

                                        <span className="flex-1 ml-3 greenspace-nowrap">
                                            Total Users
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/ownerList"
                                        className={
                                            location.pathname === "/admin/userList"
                                                ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                : "flex items-center p-2 text-gray-900 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        }
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="1.5em"
                                            width="1.5em"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <circle cx="12" cy="7" r="4" />
                                            <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                                        </svg>
                                        <span className="flex-1 ml-3 greenspace-nowrap">
                                            Total Owners
                                        </span>
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/admin/carList"
                                        className={
                                            location.pathname === "/admin/carList"
                                                ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                : "flex items-center p-2 text-gray-900 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        }
                                    >
                                        <svg
                                            viewBox="0 0 1024 1024"
                                            fill="currentColor"
                                            height="1.5em"
                                            width="1.5em"
                                        >
                                            <path d="M959 413.4L935.3 372a8 8 0 00-10.9-2.9l-50.7 29.6-78.3-216.2a63.9 63.9 0 00-60.9-44.4H301.2c-34.7 0-65.5 22.4-76.2 55.5l-74.6 205.2-50.8-29.6a8 8 0 00-10.9 2.9L65 413.4c-2.2 3.8-.9 8.6 2.9 10.8l60.4 35.2-14.5 40c-1.2 3.2-1.8 6.6-1.8 10v348.2c0 15.7 11.8 28.4 26.3 28.4h67.6c12.3 0 23-9.3 25.6-22.3l7.7-37.7h545.6l7.7 37.7c2.7 13 13.3 22.3 25.6 22.3h67.6c14.5 0 26.3-12.7 26.3-28.4V509.4c0-3.4-.6-6.8-1.8-10l-14.5-40 60.3-35.2a8 8 0 003-10.8zM264 621c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zm388 75c0 4.4-3.6 8-8 8H380c-4.4 0-8-3.6-8-8v-84c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v36h168v-36c0-4.4 3.6-8 8-8h40c4.4 0 8 3.6 8 8v84zm108-75c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40zM220 418l72.7-199.9.5-1.3.4-1.3c1.1-3.3 4.1-5.5 7.6-5.5h427.6l75.4 208H220z" />
                                        </svg>

                                        <span className="flex-1 ml-3 greenspace-nowrap">
                                            Total Rooms
                                        </span>
                                    </Link>
                                </li>

                                <li>
                                    <Link
                                        to="/admin/bookings"
                                        className={
                                            location.pathname === "/admin/bookings"
                                                ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                                : "flex items-center p-2 text-gray-900 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-700 group"
                                        }
                                    >
                                        <svg
                                            fill="none"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            viewBox="0 0 24 24"
                                            height="1.5em"
                                            width="1.5em"
                                        >
                                            <path stroke="none" d="M0 0h24v24H0z" />
                                            <path d="M4 18V8.5A4.5 4.5 0 018.5 4h7A4.5 4.5 0 0120 8.5v7a4.5 4.5 0 01-4.5 4.5H6a2 2 0 01-2-2z" />
                                            <path d="M8 12h3.5a2 2 0 110 4H8V9a1 1 0 011-1h1.5a2 2 0 110 4H9M16 16h.01" />
                                        </svg>
                                        <span className="flex-1 ml-3 greenspace-nowrap">
                                            Total bookings
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className=" w-[300px] h-screen hidden shadow-lg md:flex bg-white text-gray-900">
                <div className="p-4 w-full">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                to="/admin/dashboard"
                                className={
                                    location.pathname === "/admin/dashboard"
                                        ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                        : "flex items-center p-2 text-gray-500 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                }
                            >
                                <svg
                                    fill="none"
                                    viewBox="0 0 15 15"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path
                                        fill="currentColor"
                                        fillRule="evenodd"
                                        d="M2.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 001.04 2.15C1 2.324 1 2.52 1 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 002.15 6.96C2.324 7 2.52 7 2.75 7H5.25c.229 0 .426 0 .6-.041A1.5 1.5 0 006.96 5.85C7 5.676 7 5.48 7 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 005.85 1.04C5.676 1 5.48 1 5.25 1H2.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.003.374-.014.417a.5.5 0 01-.37.37C5.575 5.996 5.509 6 5.2 6H2.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C2.004 5.575 2 5.509 2 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM9.8 1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 2.15C8 2.324 8 2.52 8 2.75V5.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 6.96C9.324 7 9.52 7 9.75 7H12.25c.229 0 .426 0 .6-.041A1.5 1.5 0 0013.96 5.85C14 5.676 14 5.48 14 5.25V2.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 1.04C12.676 1 12.48 1 12.25 1H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.003-.417-.014a.5.5 0 01-.37-.37C9.004 5.575 9 5.509 9 5.2V2.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37zM2.75 8H5.25c.229 0 .426 0 .6.041A1.5 1.5 0 016.96 9.15C7 9.324 7 9.52 7 9.75V12.25c0 .229 0 .426-.041.6A1.5 1.5 0 015.85 13.96C5.676 14 5.48 14 5.25 14H2.75c-.229 0-.426 0-.6-.041A1.5 1.5 0 011.04 12.85C1 12.676 1 12.48 1 12.25V9.75c0-.229 0-.426.041-.6A1.5 1.5 0 012.15 8.04C2.324 8 2.52 8 2.75 8zm.05 1c-.308 0-.374.003-.417.014a.5.5 0 00-.37.37C2.004 9.425 2 9.491 2 9.8v2.4c0 .308.003.374.014.417a.5.5 0 00.37.37c.042.01.108.013.416.013h2.4c.308 0 .374-.004.417-.014a.5.5 0 00.37-.37c.01-.042.013-.108.013-.416V9.8c0-.308-.003-.374-.014-.417a.5.5 0 00-.37-.37C5.575 9.004 5.509 9 5.2 9H2.8zm7-1h-.05c-.229 0-.426 0-.6.041A1.5 1.5 0 008.04 9.15C8 9.324 8 9.52 8 9.75V12.25c0 .229 0 .426.041.6A1.5 1.5 0 009.15 13.96c.174.041.371.041.6.041H12.25c.229 0 .426 0 .6-.041a1.5 1.5 0 001.109-1.109c.041-.174.041-.371.041-.6V9.75c0-.229 0-.426-.041-.6A1.5 1.5 0 0012.85 8.04C12.676 8 12.48 8 12.25 8H9.8zm-.417 1.014c.043-.01.11-.014.417-.014h2.4c.308 0 .374.003.417.014a.5.5 0 01.37.37c.01.042.013.108.013.416v2.4c0 .308-.004.374-.014.417a.5.5 0 01-.37.37c-.042.01-.108.013-.416.013H9.8c-.308 0-.374-.004-.417-.014a.5.5 0 01-.37-.37C9.004 12.575 9 12.509 9 12.2V9.8c0-.308.003-.374.014-.417a.5.5 0 01.37-.37z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/userList"
                                className={
                                    location.pathname === "/admin/userList"
                                        ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                        : "flex items-center p-2 text-gray-500 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                }
                            >
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                                </svg>

                                <span className="ml-3">
                                    Total Users
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/ownerList"
                                className={
                                    location.pathname === "/admin/ownerList"
                                        ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                        : "flex items-center p-2 text-gray-500 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                }
                            >
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx="12" cy="7" r="4" />
                                    <path d="M6 21v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
                                </svg>
                                <span className="flex-1 ml-3 greenspace-nowrap">
                                    Total Owners
                                </span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/admin/roomList"
                                className={
                                    location.pathname === "/admin/roomList"
                                        ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                        : "flex items-center p-2 text-gray-500 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                }
                            >
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    height="1.5em"
                                    width="1.5em"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M12 2L2 12V21.5C2 21.7761 2.22386 22 2.5 22H5V15H9V22H15V15H19V22H21.5C21.1 22 22 21.7761 22 21.5V12L12"
                                        fill="currentColor"
                                    />
                                </svg>


                                <span className="flex-1 ml-3 greenspace-nowrap">
                                    Total Rooms
                                </span>
                            </Link>
                        </li>

                        <li>
                            <Link
                                to="/admin/bookings"
                                className={
                                    location.pathname === "/admin/bookings"
                                        ? "flex items-center p-2 text-gray-800 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                        : "flex items-center p-2 text-gray-500 rounded-lg dark:text-grayhover:bg-gray-100 dark:hover:bg-gray-200 group"
                                }
                            >
                                <svg
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    height="1.5em"
                                    width="1.5em"
                                >
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <path d="M4 18V8.5A4.5 4.5 0 018.5 4h7A4.5 4.5 0 0120 8.5v7a4.5 4.5 0 01-4.5 4.5H6a2 2 0 01-2-2z" />
                                    <path d="M8 12h3.5a2 2 0 110 4H8V9a1 1 0 011-1h1.5a2 2 0 110 4H9M16 16h.01" />
                                </svg>
                                <span className="flex-1 ml-3 greenspace-nowrap">
                                    Total bookings
                                </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    );
};

export default AdminSidebar;
