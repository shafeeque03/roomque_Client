import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteRoom } from "../../api/ownerApi";
import { roomBlock } from "../../api/ownerApi";
import { toast } from "react-toastify";
const RoomCards = ({ value }) => {
  const [loading, setLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(value.is_blocked);
  const blockUnblockRoom = async (roomId, status) => {
    try {
      setLoading(true);
      const res = await roomBlock(roomId, status);
      if (res.status === 200) {
        setLoading(false);
        setIsAvailable(!status);
        // Assuming you have a state to manage the availability, update it here
        // For example, if you have a state like `setIsAvailable`, use it like this:
        // setIsAvailable(!status);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
      console.log(error.message);
    }
  };
  return (
    <div>
      <div className="relative flex max-w-[18rem] max-h-[22rem] flex-col overflow-hidden rounded-xl bg-slate-100 bg-clip-border text-gray-700 shadow-md m-3 hover:scale-110 cursor-pointer mb-7">
        <Link to="/owner/details" state={value}>
          <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border h-48">
            <img src={value.roomImages[0]} alt="ui/ux review check" />
          </div>
        </Link>

        <div className="p-3">
          <div class='flex justify-between'>
          <h6 className="block font-sans text-md antialiased text-lg font-semibold leading-snug tracking-normal text-blue-gray-900">
            {value.roomName}
          </h6>
          
          
          </div>
          <p className="text-sm">{value.acType} Room </p>
          <p className="text-sm">{value.about}</p>
          <p className="text-sm">Rent - {value.rent}/m</p>
        </div>
        <div className="flex items-center ps-3 pb-3 justify-between me-5">
          <div className="flex">
            <svg
              className="h-4 w-4 text-black-500 mt-2"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" />
              <circle cx="12" cy="11" r="3" />
              <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1 -2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
            </svg>
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-inherit ms-1 mt-1">
              {value.location}
            </p>
          </div>
          {isAvailable ? (
            <div>
              <button
                type="button"
                class="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                onClick={() => blockUnblockRoom(value._id, isAvailable)}
              >
                UnListed
              </button>
            </div>
          ) : (
            <div>
              <button
                type="button"
                class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900"
                onClick={() => blockUnblockRoom(value._id, isAvailable)}
              >
                Listed
              </button>
            </div>
          )}
          
        </div>
      </div>
    </div>
  );
};

export default RoomCards;
