import React, { useEffect, useState } from "react";
import Pagination from "../common/Pagination";
import { roomList, bookingList } from "../../api/adminApi";
import { toast } from "react-toastify";

const BookingList = () => {
  const [bookings, setBookings] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 5;

  useEffect(() => {
    bookingList()
      .then((res) => {
        setBookings(res?.data?.bookings);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
    setCurrentPage(1);
  };
  const filteredData = !searchInput
    ? bookings
    : bookings.filter((room) =>
        room.roomName.toLowerCase().includes(searchInput.toLowerCase())
      );
  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const roomsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);
  return (
    <>
      <div className="w-full md:w-3/4 px-4 mb-5 mt-5 ms-10">
        <div className="rounded-lg dark:border-gray-700">
          <h1 className="text-3xl pt-2 mb-3 text-gray-900">Booking List</h1>
          <div className="relative  shadow-md sm:rounded-lg">
            <div className="flex items-center justify-end py-4 bg-white dark:bg-gray-300 mb-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ">
                  <svg
                    className="w-4 h-4 text-gray-500 dark:text-green-100"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search-rooms"
                  value={searchInput}
                  onChange={handleInputChange}
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 me-2"
                  placeholder="Search for bookings"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-400 dark:text-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Room
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Client
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Booked For
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="mt-5">
                {roomsInSinglePage.length > 0 ? (
                  roomsInSinglePage.map((data) => (
                    <tr
                      key={data?._id}
                      className="bg-white border-b dark:bg-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200 rounded"
                    >
                      <th
                        scope="row"
                        className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white rounded"
                      >
                        <div>
                          <div className="text-base font-semibold text-slate-700">
                            {data?.room.roomName}
                          </div>
                          <div className="font-normal text-gray-500">
                            {data?.room.location}
                          </div>
                        </div>
                      </th>
                      <td className="px-6 py-4 text-slate-700">
                        {data?.userName}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(data?.date).toLocaleDateString("en-GB")}
                      </td>
                      <td className="px-6 py-4 text-slate-700">
                        {new Date(data?.BookedFor).toLocaleDateString("en-GB")}
                      </td>
                      <td>
                        <button
                          type="button"
                          className="focus:outline-none w-24 text-white bg-blue-600  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:focus:ring-red-900"
                        >
                          {data?.status}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-gray-900 dark:text-white"
                    >
                      No rooms
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {roomsInSinglePage.length > 1 && (
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
  );
};

export default BookingList;
