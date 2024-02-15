import React, { useEffect, useState } from "react";
import { myBookings } from "../../api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { cancelBooking } from "../../api/userApi";
import { toast } from "react-toastify";
import { userLogin } from "../../Redux/slices/UserSlice";
import { Rating } from "@material-tailwind/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faMessage } from "@fortawesome/free-solid-svg-icons";
import { postRatingAndReview } from "../../api/userApi";
import Spinner from "../common/Spinner";
import { myRatings } from "../../api/userApi";
import { date } from "yup";
import { Link } from "react-router-dom";
import Pagination from "../../Components/common/Pagination";

const Bookings = () => {
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const userId = user._id;
  const userName = user.name;
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState([]);
  const [ratings, setRatings] = useState([]);
  const now = new Date();
  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedRating, setSelectedRating] = useState(0);
  const [review, setReview] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const dataPerPage = 6;

  const filteredData = booking;

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const BookingsInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

  useEffect(() => {
    myBookings(userId)
      .then((res) => {
        setBooking(res?.data?.booked);
        setRatings(res?.data?.ratings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  }, [userId]);

  const CancelBooking = async (bookId) => {
    try {
      const res = await cancelBooking(bookId);
      if (res.status === 200) {
        setBooking((prevBooking) => {
          const updatedBooking = prevBooking.map((book) => {
            if (book._id === bookId) {
              return { ...book, isCancelled: true, status: "Cancelled" };
            }
            return book;
          });
          return updatedBooking;
        });
        const { userData } = res.data;
        console.log(userData, "data gottt userData");
        dispatch(
          userLogin({
            user: userData,
          })
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };

  const PostReview = async (roomId) => {
    try {
      setLoading(true);
      const res = await postRatingAndReview(
        roomId,
        userName,
        userId,
        selectedRating,
        review
      );
      if (res.status == 200) {
        setRatings((preRating) => {
          return preRating.map((ratingss) => {
            if (ratingss.roomId === roomId) {
              return {
                ...ratingss,
                rating: selectedRating,
                review: review,
              };
            }
            return ratingss;
          });
        });

        setSelectedRating(0);
        setReview("");
        setShowModal(false);
        setLoading(false);
        toast(res.data.message, {
          className: "bg-slate-700 text-white",
          position: toast.POSITION.BOTTOM_CENTER,
        });
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const handleRateReviewClick = (book) => {
    setSelectedBooking(book);
    ratings.map((value) => {
      if (value.roomId == book.roomId) {
        setSelectedRating(value.rating);
        setReview(value.review);
      }
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [cancelBookingId, setCancelBookingId] = useState(null);

  const handleCancelBookingClick = (bookId) => {
    setCancelBookingId(bookId);
    setShowCancelModal(true);
  };

  const handleCloseCancelModal = () => {
    setCancelBookingId(null);
    setShowCancelModal(false);
  };

  const handleConfirmCancelBooking = () => {
    if (cancelBookingId) {
      CancelBooking(cancelBookingId);
    }
    handleCloseCancelModal();
  };
  return (
    <div>
      <div class="w-full min-h-screen mx-auto p-2 bg-slate-100 fade-ef">
        <p class="text-center text-sm text-slate-500">
          Note : Advance is non-refundable if cancelled after 2 days
        </p>
        {loading && ratings !== null ? (
          <div className="flex justify-center m-auto mt-12">
            <Spinner />
          </div>
        ) : (
          <>
            <div class="mx-auto max-w-screen-2xl px-4 py-8 sm:px-8">
              <div class="overflow-y-hidden rounded-lg border">
                <div class="overflow-x-auto">
                  <table class="w-full">
                    <thead>
                      <tr class="bg-green-600 text-left text-xs font-semibold uppercase tracking-widest text-white">
                        <th class="px-5 py-3">NO</th>
                        <th class="px-5 py-3">Name</th>
                        <th class="px-5 py-3">Location</th>
                        <th class="px-5 py-3">Date</th>
                        <th class="px-5 py-3">Booked for</th>
                        <th class="px-5 py-3">Status</th>
                        <th class="px-5 py-3">Review</th>
                        <th class="px-5 py-3">Balance</th>
                        <th class="px-5 py-3">Chat</th>
                      </tr>
                    </thead>
                    <tbody class="text-gray-500">
                      {BookingsInSinglePage.length > 0 ? (
                        BookingsInSinglePage.map((book, index) => (
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
                                {new Date(book.date).toLocaleDateString(
                                  "en-GB"
                                )}
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
                                    onClick={() =>
                                      handleCancelBookingClick(book._id)
                                    }
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
                                    onClick={() => handleRateReviewClick(book)}
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
                              <p>₹{book.balance}</p>
                            </td>
                            <td className="border-b border-gray-200 bg-white px-5  text-sm">
                              <Link to="/chat">
                                <FontAwesomeIcon
                                  icon={faMessage}
                                  style={{
                                    color: "green",
                                    width: 50,
                                    height: 25,
                                  }}
                                />
                              </Link>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="px-6 py-4 text-center text-gray-900 dark:text-white"
                          >
                            No Bookings
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="m-auto flex justify-center mb-5">
              {BookingsInSinglePage.length > 0 && (
                <Pagination
                  numbers={numbers}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </>
        )}
      </div>

      {showModal && selectedBooking && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full">
            <h1 className="text-xl font-bold mb-4 text-green-800">
              Rate & Review for {selectedBooking.room.roomName}
            </h1>

            <label className="block text-slate-500 text-sm mb-2">Rating</label>
            <div className="flex items-center gap-4">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  className={`text-lg px-3 ${
                    selectedRating >= value
                      ? "text-yellow-400 "
                      : "text-gray-400"
                  }`}
                  onClick={() => setSelectedRating(value)}
                >
                  <FontAwesomeIcon icon={faStar} />
                </button>
              ))}
            </div>

            <label className="block text-slate-500 text-sm mb-2">Review</label>
            <textarea
              className="border p-2 mb-4 w-full"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            ></textarea>

            <button
              type="submit"
              className="bg-red-500 text-white p-2 rounded"
              onClick={handleCloseModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 ms-2 text-white p-2 rounded"
              onClick={() => PostReview(selectedBooking.roomId)}
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {showCancelModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-8 rounded-lg z-10 max-w-md w-full">
            <h1 className="text-xl font-bold mb-6 text-red-500">
              Confirm Cancellation
            </h1>
            <p className="mb-4 text-slate-600 font-bold">
              Are you sure you want to cancel this booking?
            </p>
            <button
              type="button"
              className="bg-red-500 px-5 text-white p-2 rounded"
              onClick={handleCloseCancelModal}
            >
              No
            </button>
            <button
              type="button"
              className="bg-green-500 px-5 ms-2 text-white p-2 rounded"
              onClick={handleConfirmCancelBooking}
            >
              Yes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
