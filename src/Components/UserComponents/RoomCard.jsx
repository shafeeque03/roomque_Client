import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from '@fortawesome/free-regular-svg-icons';

const RoomCard = ({ value }) => {
  return (
    <div>
      <Link to={`/roomDetails/${value._id}`}>
        <div className="relative flex max-w-[18rem] max-h-[18rem] flex-col overflow-hidden rounded-xl bg-slate-100 bg-clip-border text-gray-700 shadow-md m-3 hover:scale-110 cursor-pointer mb-7">
          <div className="relative m-0 overflow-hidden text-gray-700 bg-transparent rounded-none shadow-none bg-clip-border h-48"> {/* Set a fixed height */}
            <img
              src={value.roomImages[0]}
              alt="ui/ux review check"    
            />
          </div>
          <div className="p-4">
            <div class='flex justify-between'>
            <h6 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-g-900">
              {value.roomName}
            </h6>
            <FontAwesomeIcon icon={ faHeart } className="w-7 h-7 me-2" size="lg" style={{color: "#0d4702", background:""}} />
            </div>
            <p className="text-sm">{value.acType} </p>
            <p className="text-sm">{value.about}</p>
            <p className="text-sm">Rent - {value.rent}/m</p>
          </div>
          <div className="flex items-center justify-between ps-3 pb-3">
            <div class='flex'>
            <svg
              className="h-4 w-4 mt-0.5 text-black-500"
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
            <p className="block font-sans text-sm antialiased font-normal leading-relaxed text-inherit ms-1">
              {value.location}
            </p>
            </div>
            {value.is_available == false ? (<><div><p class='bg-slate-300 me-2 rounded-2xl px-2 p-1 text-sm'>Not Available</p></div></>):(<></>)}
            
          </div>
        </div>
      </Link>
    </div>
  );
};

export default RoomCard;
