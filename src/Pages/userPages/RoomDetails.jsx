import React, { useEffect, useState, lazy, Suspense } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faMessage,
  faStar,
  faLocation,
  faStarHalf,
} from "@fortawesome/free-solid-svg-icons";
import { bookRoom } from "../../api/userApi";
import { toast } from "react-toastify";
import { getRoomDetails } from "../../api/userApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Spinner from "../../Components/common/Spinner";
import { loadStripe } from "@stripe/stripe-js";
import { paymentApi } from "../../api/userApi";
import { checkRoomAvailable } from "../../api/userApi";

const RoomDetails = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.userReducer);
  const userId = user._id;
  const { roomId } = useParams();
  const [date, setDate] = useState(null);
  const today = new Date();
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState({});
  const [allReviews, setAllReviews] = useState([]);
  const [showDate, setShowDate] = useState(false);
  const [load, setLoad] = useState(true);
  const [avgRating, setAvgRating] = useState(null);
  const [modalopen, setModalOpen] = useState(false);
  const stripe_key = import.meta.env.VITE_APP_STRIPE_KEY
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

  const booking = async (roomId, ownerId) => {
    try {
      if (date == null) {
        toast.error("Select a Date");
      } else {
        const selectedDate = new Date(date);
        if (selectedDate<today) {
          toast.error("Select a Valid Date");
        } else {
          const ret = await checkRoomAvailable(roomId, date)
          if(ret.status==200){
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

  const makePayment = async()=>{
    try {
      if(date==null){
        toast.error("Select a Date")
      }else{
        const selectedDate = new Date(date);
        if(selectedDate<today){
          toast.error("Select a valid date")
        }else{
          const ret = await checkRoomAvailable(roomId, date)
          if(ret.status==200){
            const stripe = await loadStripe(stripe_key)
      const res = await paymentApi(roomDetails[0],date)
      const sessionId = res.data.id
      const result = stripe.redirectToCheckout({
        sessionId:sessionId
      })

      if(result.error){
        console.log(error);
      }
          }
        }
      }
      
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message);
    }
  }

  
  return (
    <div>
      <UserNavbar />
      {load ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <section class="overflow-hidden bg-slate-100 font-poppins fade-ef">
            <div class="max-w-6xl mx-auto ">
              <div
                class="flex m-auto mt-11 mb-1"
                style={{ height: 500, width: 700 }}
              >
                <div class="mt-8 m-auto">
                  {roomDetails[0].roomImages.map((img) => (
                    <div class="w-24 h-24 ms-2 mt-2">
                      <img src={img} class="w-full h-full rounded-xl" alt="" />
                    </div>
                  ))}
                </div>
                <div class="w-3/4 h-full me-3">
                  <img
                    src={roomDetails[0].roomImages[0]}
                    class="w-full h-full rounded-xl"
                    alt=""
                  />
                </div>
              </div>

              <div class="w-full m-auto h-auto mt-11 mb-11  p-2 rounded-xl bg-slate-300 ">
                <p class="text-center text-xs">
                  Book your room by paying an advance of ₹500
                </p>
                {avgRating == "No review Available" ? (
                  <>
                    <p class="ms-2 text-sm text-slate-500">
                      No rating Available
                    </p>
                  </>
                ) : (
                  <>
                    <div class="flex items-center ms-2">
                    <p class="ms-1 text-sm font-bold text-gray-900 dark:text-green-600">
                        {avgRating}
                      </p>
                      <svg
                        class="w-4 h-4 text-green-600 me-1"
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

                <div class="flex justify-between">
                  <div>
                    <p class="m-2 text-slate-800 text-lg font-bold">
                      ₹{roomDetails[0].rent}/m
                    </p>
                    <p class="m-2 text-slate-800 text-sm">
                      {roomDetails[0].roomName}
                    </p>

                    <p class="m-2 text-slate-800 text-sm">
                      Description : {roomDetails[0].about}
                    </p>
                    <p class="m-2 text-slate-800 text-sm">
                      Type : {roomDetails[0].roomType}
                    </p>
                  </div>

                  <div class="m-4">
                    <p class="text-slate-800 text-sm mb-2">
                      <FontAwesomeIcon icon={faLocationDot} />{" "}
                      {roomDetails[0].location}
                    </p>
                    <p class="text-slate-800 text-sm mb-2">
                      <FontAwesomeIcon icon={faPhone} /> +91{" "}
                      {roomDetails[0].phone}
                    </p>
                    <p class="text-slate-800 text-sm mb-2">
                      Model : {roomDetails[0].model}
                    </p>
                    <p class="text-slate-800 text-sm">
                      {roomDetails[0].acType} Room
                    </p>
                  </div>
                </div>

                <div class="m-auto text-center">
                  <button
                    type="button"
                    class="focus:outline-none w-full m-auto text-white m-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg mt-2 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
                  >
                    <FontAwesomeIcon icon={faMessage} /> Chat with Owner
                  </button>

                  <>
                    {showDate ? (
                      <>
                        <label
                          for="date"
                          class="block text-sm font-medium text-gray-600"
                        >
                          Select a Date:
                        </label>
                        <input
                          type="date"
                          id="date"
                          name="date"
                          class="mt-1 p-2 border mb-3 bg-blue-700 text-white rounded-md focus:outline-none focus:border-blue-500"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                        <button
                          class="block m-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="button"
                          onClick={() =>
                            // booking(roomDetails[0]._id, roomDetails[0].ownerId)
                            makePayment()
                          }
                        >
                          Conform
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          class="block m-auto w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            <div class="border-b-2 m-5"></div>
            <div class="w-4/5 h-auto bg-slate-100  m-auto mb-11">
              <p class="mt-5">Rating & Reviews</p>
              {allReviews.map((review) => (
                <div class="border-b pb-3">
                  <p class="mt-5 ms-4 text-sm text-slate-900">
                    {review.userName}
                  </p>
                  <p class="mt-1 ms-4 text-sm text-yellow-400">
                    {[...Array(review.rating)].map((_, index) => (
                      <FontAwesomeIcon key={index} icon={faStar} />
                    ))}
                  </p>
                  <p class="mt-1 ms-4 text-sm text-slate-500">
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
