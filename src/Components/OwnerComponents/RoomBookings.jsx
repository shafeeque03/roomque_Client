import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { bookingss } from "../../api/ownerApi";
import { getRating } from "../../api/userApi";
import { checkedIn } from "../../api/ownerApi";
import { toast } from "react-toastify";
const 
RoomBookings = () => {
  const { owner } = useSelector((state) => state.ownerReducer);
  const ownerId = owner._id;
  const now = new Date();
  const [loading, setLoading] = useState(true);
  const [ratringss, setRatingss] = useState([])
  const [booking, setBooking] = useState({});
  const [modalShow, setModalShow] = useState(false)
  useEffect(() => {
    console.log(ownerId, "this is ownerIdddd");
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

  const getAllRating = async(roomId)=>{
    try {
      const res = await getRating(roomId)
      if(res.status==200){
        setRatingss(res?.data?.allRatings)
      }
      setModalShow(true)
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleCloseModal = () => {
    setModalShow(false);
    setRatingss([])
  };

  const setCheckedin = async(bookId)=>{
    try {
      const res = await checkedIn(bookId)
      if(res.status==200){
        setBooking((preBookkings) => {
          return preBookkings.map((book) => {
            if (book._id === bookId) {
              return {
                ...book,
                checkedIn: true,
              };
            }
            return book;
          });
        });
      }
    } catch (error) {
      console.log(error.message)
    }
  }

  const [confirmationModal, setConfirmationModal] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const handleOpenConfirmationModal = (bookingId) => {
    setSelectedBookingId(bookingId);
    setConfirmationModal(true);
  };

  const handleCloseConfirmationModal = () => {
    setSelectedBookingId(null);
    setConfirmationModal(false);
  };

  const handleCheckInConfirmation = () => {
    // Call the setCheckedin function with the selected bookingId
    if (selectedBookingId) {
      setCheckedin(selectedBookingId);
      handleCloseConfirmationModal();
    }
  };

  return (
    <div>
      <div class="w-full min-h-screen mx-auto fade-ef p-2 bg-slate-100">
        <p class=" ms-4 mb-4 mt-4 text-xl text-slate-500">All Bookings</p>
        {loading ? (
          <p>Loading</p>
        ) : (
          <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8">
            <div class="overflow-y-hidden rounded-lg border">
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="bg-blue-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                      <th class="px-5 py-3">NO</th>
                      <th class="px-5 py-3">Name</th>
                      <th class="px-5 py-3">User</th>
                      <th class="px-5 py-3">Date</th>
                      <th class="px-5 py-3">Booked for</th>
                      <th class="px-5 py-3">Status</th>
                      <th class="px-5 py-3">Review</th>
                    </tr>
                  </thead>
                  <tbody class="text-gray-500">
                    {booking.map((book, index) => (
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
                          <p class="whitespace-no-wrap">{book.userName}</p>
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
                          
                             {book.status=="Cancelled" ?(
                             <>
                                <span class="rounded-full bg-gray-300 px-3 py-1 text-xs font-semibold text-green-900 cursor-pointer">
                                Cancelled
                              </span>
                             </>
                             ):(
                             <>
                             {book.checkedIn ? (
                             <>
                              <span
                                className="rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-green-900 cursor-pointer"
                              >
                                Checked
                              </span>
                             </>
                             ):(
                             <>
                              <span
                                className="rounded-full bg-green-200 px-3 py-1 text-xs font-semibold text-green-900 cursor-pointer"
                                onClick={() => handleOpenConfirmationModal(book._id)}
                              >
                                Check-In
                              </span>
                             </>
                             )}
                             
                             </>
                             )}
                            
                           
                        </td>
                        <td className="border-b border-gray-200 bg-white px-1 py-5 text-sm">
                          <p
                            className="whitespace-no-wrap cursor-pointer hover:text-slate-900"
                            onClick={()=>getAllRating(book.roomId)}
                          >
                            Rate & Review
                          </p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
      {modalShow && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="absolute inset-0 bg-black opacity-50"></div>
    <div className="bg-white p-8 rounded-lg z-10 w-full max-w-3xl overflow-y-auto max-h-96">
      <div class='flex justify-between'>
      <h1 className="text-2xl font-bold mb-4 text-green-800">
        Ratings & Reviews
      </h1>
      <button
        type="button"
        className="bg-red-500 text-white  px-5 rounded"
        onClick={handleCloseModal}
      >
        X
      </button>
      
      </div>

      {/* Display all ratings */}
      {ratringss.length > 0 && (
        <div className="mt-4">
          {ratringss.map((rating, index) => (
            <div key={index} className={`mb-4 ${index < ratringss.length - 1 ? 'border-b-2' : ''}`}>
              <p className="text-slate-500 text-sm mb-1">Rating: {rating.rating}</p>
              <p className="text-slate-500 text-sm mb-1">Review: {rating.review}</p>
            </div>
          ))}
        </div>
      )}


    </div>
  </div>
)}


{confirmationModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 w-full max-w-md">
            <h1 className="text-2xl font-bold mb-4 text-green-800">
              Confirm Check-In
            </h1>
            <p className="mb-4">Are you sure you want to check-in?</p>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-green-500 text-white px-5 py-2 rounded"
                onClick={handleCheckInConfirmation}
              >
                Yes, Check-In
              </button>
              <button
                type="button"
                className="bg-red-500 text-white px-5 py-2 rounded"
                onClick={handleCloseConfirmationModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default RoomBookings;
