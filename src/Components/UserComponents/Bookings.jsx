import React, { useEffect, useState } from "react";
import { myBookings } from "../../api/userApi";
import { useSelector } from "react-redux";
import { cancelBooking } from "../../api/userApi";
const Bookings = () => {
  const { user } = useSelector((state) => state.userReducer);
  const userId = user._id;
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState({});
  const [refresh, setRefresh] = useState(false);
  const now = new Date();
  useEffect(() => {
    myBookings(userId)
      .then((res) => {
        setBooking(res?.data?.booked);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  }, []);

  const CancelBooking = async (bookId) => {
    try {
      console.log(bookId, "got you vroooo");
      setLoading(true);
      const res = await cancelBooking(bookId);
      if (res.status === 200) {
        setLoading(false);
        // Update the state after cancellation
        setBooking((prevBooking) => {
          const updatedBooking = prevBooking.map((book) => {
            if (book._id === bookId) {
              return { ...book, isCancelled: true };
            }
            return book;
          });
          return updatedBooking;
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  return (
    <div>
      <div class="w-full min-h-screen mx-auto p-2 bg-slate-100">
        <p class="text-center text-sm text-slate-500">
          Cancellation is not possible after 30 minutes of booking
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
                    Date : {new Date(books.date).toLocaleDateString("en-GB")}
                  </p>
                  {new Date(books.cancelExp) < now ? (
                    <></>
                  ) : (
                    <>
                      {books.isCancelled ? (
                        <>
                          <button
                            type="button"
                            class="text-white bg-slate-700 mt-2 w-full hover:bg-slate-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 dark:bg-slate-600 dark:hover:bg-slate-700 focus:outline-none dark:focus:ring-blue-800"
                          >
                            Cancelled
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            class="text-white bg-red-700 mt-2 w-full hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-1 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-blue-800"
                            onClick={() => CancelBooking(books._id)}
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookings;
