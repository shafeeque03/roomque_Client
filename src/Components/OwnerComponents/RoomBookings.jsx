import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookingss } from "../../api/ownerApi";


const RoomBookings = () => {
  const { owner } = useSelector((state) => state.ownerReducer);
  const ownerId = owner._id;
  
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  useEffect(() => {
      console.log(ownerId,"this is ownerIdddd")
    bookingss(ownerId)
      .then((res) => {
        setBooking(res?.data?.booked);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  }, []);
  return (
    <div>
      <div class="w-full min-h-screen mx-auto p-2 bg-slate-100">
        <p class=" ms-4 mb-4 mt-4 text-xl text-slate-500">
          All Bookings
        </p>
        {loading ? (
          <p>Loading</p>
        ) : (
          <div class="flex flex-wrap justify-center gap-4">
            {booking.map((books) => (
              <div class="w-full sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 h-auto flex flex-col bg-slate-200 rounded-xl mb-2 me-11 ms-11 mt-3">
                <div class="mb-2">
                  <img
                    class="w-full h-52 rounded-tl-xl rounded-tr-xl object-cover"
                    src={books.room.image}
                    alt={books.room.roomName}
                  />
                </div>
                <div class="m-2">
                  <p class="text-sm font-bold mb-1 text-slate-700">
                    Name: {books.room.roomName}
                  </p>
                  <p class="text-sm font-bold mb-1 text-slate-700">
                    Location: {books.room.location}
                  </p>
                  <p class="text-sm font-bold mb-1 text-slate-700">
                    Room Type: {books.room.roomName}
                  </p>
                  <p class="text-sm font-bold mb-1 text-slate-700">
                    Date: {new Date(books.date).toLocaleDateString("en-GB")}
                  </p>
                  <button
                    type="button"
                    class="text-white bg-red-700 mt-2 w-full hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Remove Booking
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoomBookings;
