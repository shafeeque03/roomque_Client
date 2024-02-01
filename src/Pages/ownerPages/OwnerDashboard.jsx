import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import OwnerNavbar from "../../Components/OwnerComponents/OwnerNavbar";
import { addCategory } from "../../api/adminApi";
import { toast } from "react-toastify";
import { myDashData } from "../../api/ownerApi";
import { useSelector } from "react-redux";

const AdminDashboard = () => {
  const chartRef = useRef();
  const [allBookings, setAllBookings] = useState(0);
  const [allLexury, setAllLexury] = useState(0);
  const [allRooms, setAllRooms] = useState(0);
  const [allNormal, setAllnormal] = useState(0);
  const [lastBookings, setLastBookings] = useState([])
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [category, setCategory] = useState("");
  const {owner} = useSelector((state) => state.ownerReducer)


  useEffect(() => {
    myDashData(owner._id)
      .then((res) => {
        setAllBookings(res?.data?.mybookingsCount);
        setAllnormal(res?.data?.normalRooms);
        setAllRooms(res?.data?.myRoomCount);
        setAllLexury(res?.data?.luxuryRooms);
        setLastBookings(res?.data?.fourbooks)
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
//   console.log(lastBookings)

  return (
    <div>
      {/* Sidebar */}
      <OwnerNavbar />

      <div className="flex overflow-auto">
        {/* <AdminSidebar /> */}

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-4 py-6">
            {/* Your Dashboard Content Goes Here */}
            <div class="flex justify-between">
              <h1 className="text-2xl font-semibold mb-4 text-slate-700">
                Owner Dashboard
              </h1>
             
            </div>

            {/* Boxes for Data */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Box 1 */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Total Bookings
                </p>
                <p className="text-3xl font-bold text-white">{allBookings}</p>
              </div>

              

              {/* Box 3 */}
              <div className="bg-gradient-to-r from-purple-400 to-red-500 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Total Rooms
                </p>
                <p className="text-3xl font-bold text-white">{allRooms}</p>
              </div>

              {/* Box 4 */}
              <div className="bg-gradient-to-r from-yellow-400 to-red-500 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Luxury Rooms
                </p>
                <p className="text-3xl font-bold text-white">{allLexury}</p>
              </div>

              <div className="bg-gradient-to-r from-green-400 to-yellow-500 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Normal Rooms
                </p>
                <p className="text-3xl font-bold text-white">{allNormal}</p>
              </div>
            </div>

            {/* Graph */}
            <div className="mt-8">
              <div className="bg-gradient-to-r from-green-300 to-yellow-200 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Latest Bookings
                </p>
                {/* Chart Container */}
                {/* <canvas ref={chartRef}></canvas> */}
              </div>
            </div>
            <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8">
              <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="bg-blue-500 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>
                        <th class="px-5 py-3"></th>

                      </tr>
                    </thead>
                    <tbody class="text-gray-500">
                      {lastBookings.map((book, index) => (
                        <tr>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">{index + 1}</p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <div class="flex items-center">
                              <div class="h-20 w-20 flex-shrink-0">
                                <img
                                  class="h-full w-full rounded"
                                  src={book.room.image}
                                  alt=""
                                />
                              </div>
                              <div class="ml-3">
                                <p class="whitespace-no-wrap">
                                  {book.room.roomName}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">
                              {book.room.location}
                            </p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">
                              {new Date(book.date).toLocaleDateString("en-GB")}
                            </p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            <p class="whitespace-no-wrap">
                              {new Date(book.BookedFor).toLocaleDateString(
                                "en-GB"
                              )}
                            </p>
                          </td>
                          <td class="border-b border-gray-200 bg-white px-5 py-5 text-sm">
                            {book.status == "Booked" ? (
                              <>
                                <span
                                  class="rounded-full bg-red-200 px-3 py-1 cursor-pointer text-xs font-semibold text-green-900"
                                >
                                  Cancel
                                </span>
                              </>
                            ) : (
                              <>
                                <span class="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-green-900">
                                  {book.status}
                                </span>
                              </>
                            )}
                          </td>
                          {book.checkedIn ? (
                            <>
                              <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                                <span
                                  class="rounded-full bg-green-200 px-3 py-1 text-xs cursor-pointer font-semibold text-green-900"
                                >
                                  Rate & Review
                                </span>
                              </td>
                            </>
                          ) : (
                            <>
                              <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                                <span class="rounded-full bg-gray-200 px-3 py-1 text-xs cursor-pointer font-semibold text-slate-400">
                                  Rate & Review
                                </span>
                              </td>
                            </>
                          )}
                          <td className="border-b border-gray-200 bg-white px-5  text-sm">
                                <p>
                                ₹{book.balance}
                                </p>
                              </td>
                             
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </div>
  );
};

export default AdminDashboard;
