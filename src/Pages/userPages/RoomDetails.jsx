import React, { useEffect, useState } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import { getRoomDetails } from "../../api/userApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../Components/common/Spinner";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "../../api/userApi";
import { checkRoomAvailable } from "../../api/userApi";
import { payByWallet } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { userLogin } from "../../Redux/slices/UserSlice";

const RoomDetails = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const userId = user._id;
  const { roomId } = useParams();
  const [date, setDate] = useState(null);
  const today = new Date();
  const [imgIndex, setImgIndex] = useState(0);
  const [roomDetails, setRoomDetails] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [load, setLoad] = useState(true);
  const [avgRating, setAvgRating] = useState(null);
  const stripe_key = import.meta.env.VITE_APP_STRIPE_KEY;

  useEffect(() => {
    getRoomDetails(roomId)
      .then((res) => {
        setRoomDetails(res?.data?.roomDetails);
        setAllReviews(res?.data?.reviews);
        setAvgRating(res?.data?.averageRating);
        setLoad(false);
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  }, [roomId]);

  const openDate = async () => {
    try {
      setShowDate(true);
    } catch (error) {
      console.log(error.message);
    }
  };

  const booking = async (roomId) => {
    try {
      if (date == null) {
        toast.error("Select a Date");
      } else {
        const selectedDate = new Date(date);
        if (selectedDate < today) {
          toast.error("Select a Valid Date");
        } else {
          const ret = await checkRoomAvailable(roomId, date);
          if (ret.status === 200) {
            // const res = await bookRoom(roomId, userId, ownerId, date);
            if (res.status === 200) {
              toast.success(res?.data?.message);
              navigate("/bookings");
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const makePayment = async () => {
    try {
      if (date == null) {
        toast.error("Select a Date");
      } else {
        const selectedDate = new Date(date);
        if (selectedDate < today) {
          toast.error("Select a valid date");
        } else {
          const ret = await checkRoomAvailable(roomId, date);
          if (ret.status === 200) {
            const stripe = await loadStripe(stripe_key);
            const res = await paymentApi(roomDetails[0], date);
            const sessionId = res.data.id;
            const result = stripe.redirectToCheckout({
              sessionId: sessionId,
            });

            if (result.error) {
              console.log(error);
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  const payByWallettt = async () => {
    try {
      if (date == null) {
        toast.error("Select a Date");
      } else {
        const selectedDate = new Date(date);
        if (selectedDate < today) {
          toast.error("Select a valid date");
        } else {
          if (user.wallet < 500) {
            toast.error("No enough money");
          } else {
            const ret = await checkRoomAvailable(roomId, date);
            if (ret.status === 200) {
              const res = await payByWallet(roomId, userId, date);
              if (res.status === 200) {
                const { user } = res.data;

                dispatch(
                  userLogin({
                    user: user,
                  })
                );
                navigate("/success");
              }
            }
          }
        }
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="container mx-auto">
      <UserNavbar />
      {load ? (
        <div className="flex justify-center m-auto mt-12">
          <Spinner />
        </div>
      ) : (
        <>
          <section className="overflow-auto bg-slate-100 font-poppins fade-ef">
            <div className="max-w-6xl mx-auto">
              <div className=" bg-slate-100 rounded p-3">
                <div className="md:w-1/2 m-auto md:order-2">
                  <img
                    src={roomDetails[0].roomImages[imgIndex]}
                    className="w-full h-full rounded-xl object-cover"
                    alt=""
                  />
                </div>
                <div className="md:w-1/2 md:order-1 m-auto flex justify-evenly mt-4 md:mt-0">
                  <div className="flex justify-center gap-5 mt-3 m-auto w-full h-full">
                    {roomDetails[0].roomImages.map((img, index) => (
                      <div key={index} className="w-20 h-20 mt-2">
                        <img
                          src={roomDetails[0].roomImages[index]}
                          className="w-full h-full cursor-pointer rounded-xl object-cover"
                          alt=""
                          onClick={() => setImgIndex(index)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full m-auto mt-1 md:mt-5 mb-11 p-2 rounded-xl bg-slate-300">
                <p className="text-center mb-3 text-xs">
                  Book your room by paying an advance of ₹500
                </p>
                {avgRating === "No review Available" ? (
                  <>
                    <p className="ms-2 text-sm text-slate-500">
                      No rating Available
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-center w-14 flex justify-center py-1 bg-green-600 rounded-lg ms-2">
                      <p className="ms-1 me-1 mt- text-sm font-bold text-gray-50 dark:text-white">
                        {avgRating}
                      </p>
                      <svg
                        className="w-4 h-4 text-gray-50 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                    </div>
                  </>
                )}

                <div className="flex justify-between">
                  <div>
                    <p className="m-2 text-slate-800 text-lg font-bold">
                      ₹{roomDetails[0].rent}/m
                    </p>
                    <p className="m-2 text-slate-800 text-sm">
                      {roomDetails[0].roomName}
                    </p>

                    <p className="m-2 text-slate-800 text-sm">
                      Description: {roomDetails[0].about}
                    </p>
                    <p className="m-2 text-slate-800 text-sm">
                      Type: {roomDetails[0].roomType}
                    </p>
                  </div>

                  <div className="m-4">
                    <p className="text-slate-800 text-sm mb-2">
                      <FontAwesomeIcon icon={faLocationDot} />{" "}
                      {roomDetails[0].location}
                    </p>
                    <p className="text-slate-800 text-sm mb-2">
                      <FontAwesomeIcon icon={faPhone} /> +91{" "}
                      {roomDetails[0].phone}
                    </p>
                    <p className="text-slate-800 text-sm mb-2">
                      Model: {roomDetails[0].model}
                    </p>
                    <p className="text-slate-800 text-sm">
                      {roomDetails[0].acType} Room
                    </p>
                  </div>
                </div>

                <div className="m-auto text-center">
                  <>
                    {showDate ? (
                      <>
                        <label
                          htmlFor="date"
                          className="block text-sm font-medium text-gray-600"
                        >
                          Select a Date:
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          className="mt-1 p-2 border mb-3 bg-green-50 text-black rounded-md focus:outline-none focus:border-white"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <div className="w-full m-auto">
                          <button
                            className="block m-auto w-full mb-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-gray-900"
                            type="button"
                            onClick={() => payByWallettt()}
                          >
                            Pay by Wallet <br />{" "}
                            <p
                              className="text-slate-200 flex justify-center"
                              style={{ fontSize: 12 }}
                            >
                              {" "}
                              Balance : {user.wallet}
                            </p>
                          </button>
                          <button
                            className="block m-auto w-full text-white mb-2 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800"
                            type="button"
                            onClick={() => makePayment()}
                          >
                            Pay by Stripe <br />{" "}
                            <p
                              className="text-slate-200 flex justify-center"
                              style={{ fontSize: 12 }}
                            >
                              {" "}
                              100% Safe
                            </p>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <button
                          className="block m-auto w-full text-white bg-blue-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          type="button"
                          onClick={() => openDate()}
                        >
                          Book Room
                        </button>
                      </>
                    )}
                  </>
                </div>
              </div>
            </div>
            <div className="border-b-2 m-5"></div>
            <div className="w-4/5 h-auto bg-slate-100  m-auto mb-11">
              <p className="mt-5">Rating & Reviews</p>
              {allReviews.map((review, index) => (
                <div key={index} className="border-b pb-3">
                  <p className="mt-5 ms-4 text-sm text-slate-900">
                    {review.userName}
                  </p>
                  <p className="mt-1 ms-4 text-sm text-yellow-400">
                    {[...Array(review.rating)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} />
                    ))}
                  </p>
                  <p className="mt-1 ms-4 text-sm text-slate-500">
                    {review.review}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default RoomDetails;
