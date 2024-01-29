import React, { useEffect, useState } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import RoomCard from "../../Components/UserComponents/RoomCard";
import { getRooms } from "../../api/userApi";
import Pagination from "../../Components/common/Pagination";
import { useSelector } from "react-redux";
import DummyHome from "../../Components/UserComponents/DummyHome";
import { searchLocation, filteredRooms } from "../../api/userApi"; // Import filteredRooms
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

const UserHome = () => {
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomModels: [],
    acTypes: [],
    categories: [],
  });
  const { user } = useSelector((state) => state.userReducer);
  const dataPerPage = 8;

  useEffect(() => {
    getRooms()
      .then((res) => {
        setRooms(res?.data?.rooms);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

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

  const searchRoom = async () => {
    try {
      const res = await searchLocation(searchInput);
      if (res.status === 200) {
        setRooms(res.data.fRooms);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleInputChange = debounce((value) => {
    setSearchInput(value);
    setCurrentPage(1);
  }, 100);

  const [rentFilter, setRentFilter] = useState({
    min: "",
    max: "",
  });
  
  const handleRentChange = (type, value) => {
    setRentFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };

  const applyFilters = async () => {
    try {
      console.log("hihi")
      if(rentFilter.min > rentFilter.max){
        toast.error("Select a valid range")
      }else{

        const res = await filteredRooms(selectedFilters, rentFilter);
        setRooms(res.data.filtered);
        setFilterDropdownOpen(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCheckboxChange = (filterType, value) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
  
      if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(
          (filter) => filter !== value
        );
      } else {
        updatedFilters[filterType] = [...updatedFilters[filterType], value];
      }
  
      return updatedFilters;
    });
  };
  

  const removeFilter = (filterType, value) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].filter((filter) => filter !== value),
    }));
  };

  const filteredData = rooms;

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const usersInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  const toggleFilterDropdown = () => {
    setFilterDropdownOpen(!filterDropdownOpen);
  };

  return (
    <div>
      {user ? (
        <>
          <UserNavbar />
          <div className="relative z-10">
            <div className="flex justify-between bg-green-50 p-3">
              <div>
                <button
                  id="dropdownCheckboxButton"
                  className="text-white bg-green-700 hover:bg-green-800 ms-2 w-36   font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-700 dark:hover:bg-green-700"
                  type="button"
                  onClick={toggleFilterDropdown}
                >
                  Filter Room
                  <svg
                    className="w-2.5 h-2.5 ms-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {filterDropdownOpen && (
                  <div className="absolute z-20 mt-2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1 p-8">
                      <div>
                        <label className="flex items-center px-4 py-2  text-sm border-b-2 text-gray-700 ">
                          <span className="ml-2">Room Model</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("roomModels", "Lexury")}
                          />
                          <span className="ml-2">Lexury</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("roomModels", "Medium")}
                          />
                          <span className="ml-2">Medium</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("roomModels", "Normal")}
                          />
                          <span className="ml-2">Normal</span>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center px-4 py-2  text-sm border-b-2 text-gray-700">
                          <span className="ml-2">Ac Type</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("acTypes", "AC")}
                          />
                          <span className="ml-2">Ac</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("acTypes", "Non-AC")}
                          />
                          <span className="ml-2">Non-Ac</span>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center px-4 py-2  text-sm border-b-2 text-gray-700">
                          <span className="ml-2">Category</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("categories", "flat")}
                          />
                          <span className="ml-2">Flat</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() => handleCheckboxChange("categories", "hotel")}
                          />
                          <span className="ml-2">Hotel</span>
                        </label>
                      </div>

                      <div>
          <label className="flex items-center px-4 py-2 text-sm border-b-2 text-gray-700">
            <span className="ml-2">Rent Range</span>
          </label>
          <div className="flex items-center px-4 py-2 text-sm text-gray-700">
            <input
              type="text"
              className="form-input h-8 w-16 mr-2 text-gray-800 border rounded"
              placeholder="Min"
              onChange={(e) => handleRentChange("min", e.target.value)}
            />
            <span className="mr-2">-</span>
            <input
              type="text"
              className="form-input h-8 w-16 ml-2 text-gray-800 border rounded"
              placeholder="Max"
              onChange={(e) => handleRentChange("max", e.target.value)}
            />
          </div>
        </div>

                      <button className='bg-green-700 text-slate-50 w-full px-4 py-1 mb-4 mt-4 text-center m-auto rounded' onClick={applyFilters}>Apply</button>
                      
                    </div>
                  </div>
                )}
              </div>
              <div className="w-full flex justify-end pe-8 h-full pt-2 bg-green-50">
                <input
                  type="search"
                  id="voice-search"
                  className="bg-slate-200 me-5 mt-2 top-0 right-0 red-300 text-gray-900 text-sm rounded-3xl  focus:red-500 block w-42 ps-5 p-2.5  dark:bg-gray-50 border-2 dark:red-600 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-red-500 dark:focus:red-500"
                  placeholder="Search location"
                  required
                  value={searchInput}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
                <FontAwesomeIcon
                  icon={faSearch}
                  className="w-6 h-9 mt-3 cursor-pointer me-2"
                  size="lg"
                  onClick={searchRoom}
                  style={{ color: "#087326" }}
                />
              </div>
            </div>
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
                  className="px-6 py-4 text-center text-xl text-gray-600 "
                >
                  No Rooms Available
                </td>
              </tr>
            )}
          </div>

          <div className="p-3 bg-green-50 m-auto text-center">
            <div className="m-auto">
              {usersInSinglePage.length > 0 && (
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
