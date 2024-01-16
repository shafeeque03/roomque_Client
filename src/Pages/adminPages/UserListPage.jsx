import React from 'react'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import UserList from '../../Components/AdminComponents/UserList'

const UserListPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className="mx-auto flex bg-gray-200">
        <AdminSidebar />
        <UserList/>
        </div>
    </div>
  )
}

export default UserListPage