import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import AdminNavbar from "../../Components/AdminComponents/AdminNavbar";
import AdminSidebar from "../../Components/AdminComponents/AdminSidebar";
import { dashboardData } from "../../api/adminApi";
import { addCategory } from "../../api/adminApi";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const chartRef = useRef();
  const [allOwners, setAllOwners] = useState(0);
  const [allUsers, setAllUsers] = useState(0);
  const [allRooms, setAllRooms] = useState(0);
  const [averagePerDay, setAveragePerDay] = useState(0);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [category, setCategory] = useState("");

  useEffect(() => {
    // Chart Data
    const data = {
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      datasets: [
        {
          label: "Monthly Bookings",
          data: [25, 75, 85, 75, 55, 45],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 2,
        },
      ],
    };

    // Chart Options
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };

    // Create the chart
    const myChart = new Chart(chartRef.current, {
      type: "line",
      data: data,
      options: options,
    });

    // Cleanup on component unmount
    return () => {
      myChart.destroy();
    };
  }, []);
  useEffect(() => {
    dashboardData()
      .then((res) => {
        setAllOwners(res?.data?.ownerCount);
        setAllUsers(res?.data?.userCount);
        setAllRooms(res?.data?.roomCount);
        setAveragePerDay(res?.data?.averageBookingsPerDay);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
  };

  const handleOpenCancelModal = () => {
    setShowCancelModal(true);
  };

  const handleAddCategory = async () => {
    if (category.trim().length > 0) {
      try {
        const response = await addCategory(category);
        if (response.status === 200) {
          toast.success(response?.data?.message);
          setShowCancelModal(false);
        }
      } catch (error) {
        console.error("Error adding category:", error);
      }
    }
  };
  

  return (
    <div>
      {/* Sidebar */}
      <AdminNavbar />

      <div className="flex overflow-auto">
        <AdminSidebar />

        {/* Main Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-100">
          <div className="container mx-auto px-4 py-6">
            {/* Your Dashboard Content Goes Here */}
            <div class="flex justify-between">
              <h1 className="text-2xl font-semibold mb-4 text-slate-700">
                Admin Dashboard
              </h1>
              <button
                type="button"
                className="text-white fade-ef bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-4 ms-7"
                onClick={() => handleOpenCancelModal()}
              >
                Add Category
              </button>
            </div>

            {/* Boxes for Data */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {/* Box 1 */}
              <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Total Users
                </p>
                <p className="text-3xl font-bold text-white">{allUsers}</p>
              </div>

              {/* Box 2 */}
              <div className="bg-gradient-to-r from-orange-400 to-blue-400 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Total Owners
                </p>
                <p className="text-3xl font-bold text-white">{allOwners}</p>
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
                  Average Booking/Day
                </p>
                <p className="text-3xl font-bold text-white">{averagePerDay}</p>
              </div>
            </div>

            {/* Graph */}
            <div className="mt-8">
              <div className="bg-gradient-to-r from-green-300 to-yellow-200 p-6 rounded-lg shadow-md">
                <p className="text-lg text-gray-700 font-semibold">
                  Bookings Report
                </p>
                {/* Chart Container */}
                <canvas ref={chartRef}></canvas>
              </div>
            </div>
          </div>
        </main>
      </div>
      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full">
            <h1 className="text-xl font-bold mb-6 text-gray-500">
              Add Category
            </h1>
            <input
              type="text"
              class="w-full py-1 p-2 border-2 bg-slate-50 mb-5 rounded-lg"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
            />
            {/* <p className="mb-4 text-slate-600 font-bold">Are you sure you want to cancel this booking?</p> */}
            <button
              type="button"
              className="bg-red-500 px-5 text-white p-2 rounded"
              onClick={handleCloseCancelModal}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-green-500 px-5 ms-2 text-white p-2 rounded"
              onClick={()=>handleAddCategory()}
            >
              Confirm
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
