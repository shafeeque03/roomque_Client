import React, { useEffect, useState } from 'react';
import OwnerNavbar from '../../Components/OwnerComponents/OwnerNavbar';
import OwnerFooter from '../../Components/OwnerComponents/OwnerFooter';
import RoomCards from '../../Components/OwnerComponents/RoomCards';
import { Link } from 'react-router-dom';
import { myRoomList } from '../../api/ownerApi';
import { useSelector } from 'react-redux';

const OwnerHome = () => {
  const [rooms, setRooms] = useState([]);
  const {owner} = useSelector((state) => state.ownerReducer)

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await myRoomList(owner._id);
        setRooms(response?.data?.rooms);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchRooms();
  }, [owner._id]);

  return (
    <div>
      <div className="bg-slate-50">
        <OwnerNavbar />
        <button
          type="button"
          className="text-white fade-ef bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-4 ms-7"
        >
          <Link to="/owner/addRoom">+ Add Room</Link>
        </button>

        <div className="flex flex-wrap justify-evenly bg-slate-50 min-h-screen fade-ef" >
          {rooms.map((room)=>(
            <RoomCards key={room._id} value={room} />
          ))}
        </div>
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerHome;
