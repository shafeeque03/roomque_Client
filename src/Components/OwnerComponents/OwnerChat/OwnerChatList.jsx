import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { getUser } from "../../../api/chatApi";

const OwnerChatList = ({ data, currentOwnerId,online }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userId = data?.members?.find((id) => id !== currentOwnerId);
    const getUserData = async () => {
      try {
        const { data } = await getUser(userId);
        setUserData(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    getUserData();
  }, [data, currentOwnerId]);
  return (
    <>
    <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-300">
      <div className="w-1/4">
        <img
          src="/userLogo.png"
          className="object-cover h-12 w-12 rounded-full"
          alt=""
        />
      </div>
      <div className="w-full">
        <div className="text-lg font-semibold">{userData?.name}</div>
        <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
      </div>
    </div>
    <hr style={{width:"85%", border:"0.1px solid #ececec"}}/>
    </>
  );
};

export default OwnerChatList;