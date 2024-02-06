import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { getOwner } from '../../../api/chatApi'

const ChatList = ({data,currentUserId,online, unreadMessages}) => {
  const [ownerData,setOwnerData] = useState(null)
  useEffect(()=>{
    const ownerId = data?.members?.find((id) => id !== currentUserId)
    const getOwnerData = async () => {
      try {
        const {data} = await getOwner(ownerId)
        setOwnerData(data)
      } catch (error) {
        console.log(error.message)
      }
    }
    getOwnerData()
  },[data,currentUserId])
  return (
    <>
      <div className="flex flex-row px-5 py-3 justify-center items-center border-b-2 bg-gray-200 hover:bg-gray-300">
        <div className="w-1/4">
          <img
            src="/userLogo.png"
            className="object-cover h-12 w-12 rounded-full"
            alt=""
          />
          {unreadMessages && (
            <div className="absolute h-4 w-4 bg-green-500 rounded-full top-0 right-0"></div>
          )}
        </div>
        <div className="w-full">
          <div className="text-lg font-semibold">{ownerData?.name}</div>
          <span className="text-gray-500">{online ? "Online" : "Offline"}</span>
        </div>
      </div>
    </>
  )
}

export default ChatList