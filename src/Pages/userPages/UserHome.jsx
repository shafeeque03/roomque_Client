import React, { useEffect, useState } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import RoomCard from "../../Components/UserComponents/RoomCard";
import { getRooms } from "../../api/userApi";
import Pagination from "../../Components/common/Pagination";
import { useSelector } from "react-redux";
import DummyHome from "../../Components/UserComponents/DummyHome";
import { searchLocation, filteredRooms } from "../../api/userApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { getCategories } from "../../api/ownerApi";

const UserHome = () => {
  const [rooms, setRooms] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    roomModels: [],
    acTypes: [],
    categories: [],
  });
  const [rentFilter, setRentFilter] = useState({
    min: "",
    max: "",
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

  const handleRentChange = (type, value) => {
    setRentFilter((prevFilter) => ({
      ...prevFilter,
      [type]: value,
    }));
  };

  const applyFilters = async () => {
    try {
      if (rentFilter.min > rentFilter.max) {
        toast.error("Select a valid range");
      } else {
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
      [filterType]: prevFilters[filterType].filter(
        (filter) => filter !== value
      ),
    }));
  };

  const resetFilters = () => {
    setSelectedFilters({
      roomModels: [],
      acTypes: [],
      categories: [],
    });
    setRentFilter({
      min: "",
      max: "",
    });
    applyFilters();
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

  useEffect(() => {
    getCategories(10)
      .then((res) => {
        setCategories(res?.data?.categories);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div>
      {user ? (
        <>
          <UserNavbar />
          <div className="relative z-10 container m-auto">
            <div className="flex flex-col md:flex-row bg-white p-3">
              <div className="md:w-1/2">
                <button
                  id="dropdownCheckboxButton"
                  className="text-white bg-green-700 hover:bg-green-800 md:w-36 w-full font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-green-700 dark:hover:bg-green-700"
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
                            onChange={() =>
                              handleCheckboxChange("roomModels", "Luxury")
                            }
                          />
                          <span className="ml-2">Luxury</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() =>
                              handleCheckboxChange("roomModels", "Medium")
                            }
                          />
                          <span className="ml-2">Medium</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() =>
                              handleCheckboxChange("roomModels", "Normal")
                            }
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
                            onChange={() =>
                              handleCheckboxChange("acTypes", "AC")
                            }
                          />
                          <span className="ml-2">Ac</span>
                        </label>
                        <label className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900">
                          <input
                            type="checkbox"
                            className="form-checkbox h-5 w-5 text-green-500"
                            onChange={() =>
                              handleCheckboxChange("acTypes", "Non-AC")
                            }
                          />
                          <span className="ml-2">Non-Ac</span>
                        </label>
                      </div>

                      <div>
                        <label className="flex items-center px-4 py-2  text-sm border-b-2 text-gray-700">
                          <span className="ml-2">Category</span>
                        </label>
                        {categories.map((cat) => (
                          <label
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            key={cat._id}
                          >
                            <input
                              type="checkbox"
                              className="form-checkbox h-5 w-5 text-green-500"
                              onChange={() =>
                                handleCheckboxChange("categories", cat.name)
                              }
                            />
                            <span className="ml-2">{cat.name}</span>
                          </label>
                        ))}
                      </div>

                      <div>
                        <label className="flex items-center px-4 py-2 text-sm border-b-2 text-gray-700">
                          <span className="ml-2">Rent Range</span>
                        </label>
                        <div className="flex items-center px-4 mt-3 py-2 text-sm text-gray-700">
                          <input
                            type="text"
                            className="form-input h-8 w-16 mr-2 px-1 text-gray-800 border border-slate-400 rounded"
                            placeholder="Min"
                            value={rentFilter.min}
                            onChange={(e) =>
                              handleRentChange("min", e.target.value)
                            }
                          />
                          <span className="mr-2">-</span>
                          <input
                            type="text"
                            className="form-input h-8 w-16 ml-2 px-1 text-gray-800 border border-slate-400  rounded"
                            placeholder="Max"
                            value={rentFilter.max}
                            onChange={(e) =>
                              handleRentChange("max", e.target.value)
                            }
                          />
                        </div>
                      </div>

                      <button
                        className="bg-green-700 text-slate-50 w-full px-4 py-1 mt-4 text-center m-auto rounded"
                        onClick={applyFilters}
                      >
                        Apply
                      </button>

                      <button
                        className="bg-gray-300 hover:bg-slate text-gray-700 w-full px-4 mb-3 py-1 mt-2 text-center m-auto rounded"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div className="md:w-1/2 mt-2 md:mt-0">
                <div className="flex items-center">
                  <input
                    type="search"
                    id="voice-search"
                    className="bg-slate-200 me-2 md:me-5 mt-2 top-0 right-0 red-300 text-gray-900 text-sm rounded-3xl focus:red-500 block w-full md:w-42 ps-5 p-2.5 dark:bg-gray-50 border-2 dark:red-600 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-red-500 dark:focus:red-500"
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
          </div>

          <div className="flex flex-wrap pt-1 justify-evenly bg-white min-h-screen scroll-smooth focus:scroll-auto container m-auto">
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
            <div className="m-auto mb-5">
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
