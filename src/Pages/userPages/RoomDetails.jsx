import React, { useEffect, useState, lazy, Suspense } from "react";
import UserNavbar from "../../Components/UserComponents/UserNavbar";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faPhone,
  faMessage,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { bookRoom } from "../../api/userApi";
import { toast } from "react-toastify";
import { getRoomDetails } from "../../api/userApi";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
const RoomDetails = () => {
  const navigate = useNavigate()
  const { user } = useSelector((state) => state.userReducer);
  const userId = user._id
  const { roomId } = useParams();
  const location = useLocation();
  const [roomDetails, setRoomDetails] = useState({});
  const [load, setLoad] = useState(true);
  useEffect(() => {
    getRoomDetails(roomId)
      .then((res) => {
        setRoomDetails(res?.data?.roomDetails);
        setLoad(false)
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.response?.data?.message);
      });
  }, [roomId]);


  const booking = async (roomId,ownerId) => {
    try {
      const res = await bookRoom(roomId,userId,ownerId);
      if (res.status === 200) {
        toast.success(res?.data?.message);
        navigate('/bookings')
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <UserNavbar />
      {load? (
        <>
          <p>loading</p>
        </>
      ) : (
        <><section class="overflow-hidden bg-slate-100 font-poppins">
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
            <p class="text-3xl text-green-800">
              <FontAwesomeIcon icon={faHeart} />
            </p>
          </div>

          <div class="w-full m-auto h-auto mt-11 mb-11  p-2 rounded-xl bg-slate-300 ">
            <p class="text-center text-xs">
              Book your room by paying an advance of ₹500
            </p>
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
              </div>

              <div class="m-3">
                <p class="text-slate-800 text-sm mb-2">
                  <FontAwesomeIcon icon={faLocationDot} />{" "}
                  {roomDetails[0].location}
                </p>
                <p class="text-slate-800 text-sm">
                  <FontAwesomeIcon icon={faPhone} /> +91 {roomDetails[0].phone}
                </p>
                {roomDetails[0].is_available == false ? (
                  <>
                    <div>
                      <p class="bg-slate-400 p-1 rounded-2xl px-2 mt-2  text-sm">
                        Room Not Available
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      class="focus:outline-none text-white bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg mt-2 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
                      onClick={(()=>booking(roomDetails[0]._id,roomDetails[0].ownerId))}
                    >
                      Book the Room
                    </button>
                  </>
                )}
              </div>
            </div>
            <div class="m-auto text-center">
              <button
                type="button"
                class="focus:outline-none m-auto text-white m-auto bg-green-800 hover:bg-green-700 focus:ring-4 focus:ring-green-300 font-medium rounded-lg mt-2 text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-800 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                <FontAwesomeIcon icon={faMessage} /> Chat with Owner
              </button>
            </div>
          </div>
        </div>
      </section></>
      )}
      
    </div>
  );
};

export default RoomDetails;
