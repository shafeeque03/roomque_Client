import React from 'react'
import AdminNavbar from '../../Components/AdminComponents/AdminNavbar'
import AdminSidebar from '../../Components/AdminComponents/AdminSidebar'
import OwnerList from '../../Components/AdminComponents/OwnerList'

const OwnerListPage = () => {
  return (
    <div>
        <AdminNavbar/>
        <div className="mx-auto flex bg-gray-200">
        <AdminSidebar />
        <OwnerList/>
        </div>
    </div>
  )
}

export default OwnerListPage