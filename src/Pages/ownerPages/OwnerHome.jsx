import React, { useEffect, useState } from 'react';
import OwnerNavbar from '../../Components/OwnerComponents/OwnerNavbar';
import OwnerFooter from '../../Components/OwnerComponents/OwnerFooter';
import RoomCards from '../../Components/OwnerComponents/RoomCards';
import { Link } from 'react-router-dom';
import { myRoomList } from '../../api/ownerApi';
import { useSelector } from 'react-redux';
import Pagination from '../../Components/common/Pagination';

const OwnerHome = () => {
  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {owner} = useSelector((state) => state.ownerReducer)
  const dataPerPage = 6;

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

  const filteredData = rooms

  const lastIndex = currentPage * dataPerPage;
  const firstIndex = lastIndex - dataPerPage;
  const usersInSinglePage = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  const numbers = [...Array(totalPages + 1).keys()].slice(1);

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

        <div className="flex flex-wrap pt-10 justify-evenly bg-green-50 min-h-screen scroll-smooth focus:scroll-auto fade-ef">
            {usersInSinglePage.length > 0 ? (
              usersInSinglePage.map((data) => (
                <RoomCards key={data._id} value={data} />
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-4 text-center text-xl text-gray-600 "
                >
                  No Rooms Available
                </td>
              </tr>
            )}
          </div>
        <div className="p-3 m-auto text-center mb-2">
            <div className="m-auto">
              {usersInSinglePage.length > 0 && (
                <Pagination
                  numbers={numbers}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalPages={totalPages}
                />
              )}
            </div>
          </div>
        <OwnerFooter />
      </div>
    </div>
  );
};

export default OwnerHome;
