import React from 'react'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import UserList from '../../Components/AdminComponents/UserList'
import RoomList from '../../Components/AdminComponents/RoomList'

const RoomListPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className="mx-auto flex bg-gray-200">
        <AdminSidebar />
        <RoomList/>
        </div>
    </div>
  )
}

export default RoomListPage