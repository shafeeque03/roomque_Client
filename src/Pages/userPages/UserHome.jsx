import React, { useEffect, useState } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import RoomCard from "../../Components/UserComponents/RoomCard";
import { getRooms } from "../../api/userApi";
import Pagination from "../../Components/common/Pagination";
import { useSelector } from "react-redux";
import DummyHome from "../../Components/UserComponents/DummyHome";

const UserHome = () => {
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useSelector((state) => state.userReducer);
  const dataPerPage = 6;

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res?.data?.rooms);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInputChange = debounce((value) => {
    setSearchInput(value);
    setCurrentPage(1);
  }, 500);

  const filteredData = !searchInput
    ? rooms
    : rooms.filter((room) =>
        room.location.toLowerCase().includes(searchInput.toLowerCase())
      );

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const usersInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  return (
    <div>
      {user ? (
        <>
          <UserNavbar />
          <div className="w-full relative h-full pt-2 bg-green-50">
            <input
              type="text"
              id="voice-search"
              className="bg-slate-200 absolute me-10 mt-2 top-0 right-0 red-300 text-gray-900 text-sm rounded-3xl  focus:red-500 block w-42 ps-5 p-2.5  dark:bg-gray-50 border-2 dark:red-600 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-red-500 dark:focus:red-500"
              placeholder="Search location"
              required
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap pt-10 justify-evenly bg-green-50 min-h-screen scroll-smooth focus:scroll-auto">
            {usersInSinglePage.length > 0 ? (
              usersInSinglePage.map((data) => (
                <RoomCard key={data._id} value={data} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-gray-900 dark:text-white"
                >
                  No users
                </td>
              </tr>
            )}
          </div>
          <div className="bg-green-100 p-3 m-ato text-center">
            <div className="m-auto">
              {usersInSinglePage.length > 1 && (
                <Pagination
                  numbers={numbers}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <DummyHome />
      )}
    </div>
  );
};

export default UserHome;
